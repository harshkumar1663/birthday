import { useEffect, useRef } from 'react'

const PRESETS = {
  memory: { root: 261.63, density: 0.9, air: 0.22, warmth: 0.42 },
  warm: { root: 293.66, density: 1.05, air: 0.28, warmth: 0.5 },
  dim: { root: 246.94, density: 0.85, air: 0.2, warmth: 0.36 },
  bright: { root: 329.63, density: 1.1, air: 0.32, warmth: 0.54 },
  finale: { root: 392, density: 1.2, air: 0.4, warmth: 0.62 }
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function createNoiseBuffer(audioContext) {
  const sampleRate = audioContext.sampleRate
  const buffer = audioContext.createBuffer(1, sampleRate * 1.2, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.2
  }

  return buffer
}

function createImpulseResponse(audioContext, length = 2.6, decay = 3.2) {
  const sampleRate = audioContext.sampleRate
  const size = Math.floor(sampleRate * length)
  const impulse = audioContext.createBuffer(2, size, sampleRate)

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const channelData = impulse.getChannelData(channel)
    for (let i = 0; i < size; i += 1) {
      const n = Math.random() * 2 - 1
      channelData[i] = n * Math.pow(1 - i / size, decay)
    }
  }

  return impulse
}

function createSceneLayer(audioContext, preset, sceneKey) {
  const output = audioContext.createGain()
  const dryGain = audioContext.createGain()
  const wetGain = audioContext.createGain()
  const reverb = audioContext.createConvolver()
  const masterFilter = audioContext.createBiquadFilter()
  const highPass = audioContext.createBiquadFilter()

  const noise = audioContext.createBufferSource()
  const noiseFilter = audioContext.createBiquadFilter()
  const noiseGain = audioContext.createGain()

  const intervals = [0, 4, 7, 9, 12]
  let isStopped = false
  let noteTimeout = null

  output.gain.value = 0.0001

  dryGain.gain.value = 0.72
  wetGain.gain.value = 0.34 + preset.air * 0.18

  highPass.type = 'highpass'
  highPass.frequency.value = 145
  highPass.Q.value = 0.25

  masterFilter.type = 'lowpass'
  masterFilter.frequency.value = 3400 + preset.warmth * 1800
  masterFilter.Q.value = 0.6

  reverb.buffer = createImpulseResponse(audioContext)

  noise.buffer = createNoiseBuffer(audioContext)
  noise.loop = true
  noiseFilter.type = 'highpass'
  noiseFilter.frequency.value = 3800
  noiseFilter.Q.value = 0.2
  noiseGain.gain.value = 0.002 + preset.air * 0.004

  dryGain.connect(highPass)
  highPass.connect(masterFilter)
  masterFilter.connect(output)

  dryGain.connect(reverb)
  reverb.connect(wetGain)
  wetGain.connect(output)

  noise.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(wetGain)

  noise.start(audioContext.currentTime)

  const pseudoSeed = (sceneKey || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  let noteStep = pseudoSeed % intervals.length

  const playNote = () => {
    if (isStopped) return

    const note = audioContext.createOscillator()
    const noteGain = audioContext.createGain()
    const noteFilter = audioContext.createBiquadFilter()

    const octave = noteStep % 3 === 0 ? 0.5 : 1
    const semitone = intervals[noteStep % intervals.length]
    const frequency = preset.root * octave * Math.pow(2, semitone / 12)

    note.type = 'triangle'
    note.frequency.value = frequency
    note.detune.value = (Math.random() - 0.5) * 7

    noteFilter.type = 'lowpass'
    noteFilter.frequency.value = 2400 + Math.random() * 1200
    noteFilter.Q.value = 0.45

    const attack = 0.75 + Math.random() * 0.45
    const hold = 0.8 + Math.random() * 0.8
    const release = 1.8 + Math.random() * 1.4
    const peak = 0.03 + preset.density * 0.028

    const startAt = audioContext.currentTime
    noteGain.gain.setValueAtTime(0.0001, startAt)
    noteGain.gain.linearRampToValueAtTime(peak, startAt + attack)
    noteGain.gain.linearRampToValueAtTime(peak * 0.78, startAt + attack + hold)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startAt + attack + hold + release)

    note.connect(noteFilter)
    noteFilter.connect(noteGain)
    noteGain.connect(dryGain)

    note.start(startAt)
    note.stop(startAt + attack + hold + release + 0.05)

    noteStep += 1

    const beat = 1500 + Math.random() * 1500
    noteTimeout = window.setTimeout(playNote, beat / preset.density)
  }

  noteTimeout = window.setTimeout(playNote, 400)

  return {
    output,
    fadeIn(target, duration) {
      const safeTarget = clamp(target, 0, 1)
      output.gain.cancelScheduledValues(audioContext.currentTime)
      output.gain.setTargetAtTime(safeTarget, audioContext.currentTime, duration)
    },
    fadeOut(duration) {
      output.gain.cancelScheduledValues(audioContext.currentTime)
      output.gain.setTargetAtTime(0.0001, audioContext.currentTime, duration)
    },
    stopAfter(ms) {
      isStopped = true
      if (noteTimeout) {
        window.clearTimeout(noteTimeout)
        noteTimeout = null
      }

      const stopAt = audioContext.currentTime + ms / 1000
      try {
        noise.stop(stopAt)
      } catch (err) {
        // Noise can already be stopped in strict mode re-mounts.
      }
    }
  }
}

export default function SoundManager({ scene, enabled, muted, volume }) {
  const audioContextRef = useRef(null)
  const masterGainRef = useRef(null)
  const currentLayerRef = useRef(null)

  useEffect(() => {
    if (!enabled || audioContextRef.current) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const masterGain = audioContext.createGain()

    masterGain.gain.value = 0.0001
    masterGain.connect(audioContext.destination)

    audioContextRef.current = audioContext
    masterGainRef.current = masterGain

    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {})
    }

    return () => {
      if (currentLayerRef.current) {
        currentLayerRef.current.fadeOut(0.4)
        currentLayerRef.current.stopAfter(480)
        currentLayerRef.current = null
      }

      audioContext.close().catch(() => {})
      audioContextRef.current = null
      masterGainRef.current = null
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || !scene) return

    const audioContext = audioContextRef.current
    const masterGain = masterGainRef.current
    if (!audioContext || !masterGain) return

    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {})
    }

    const preset = PRESETS[scene.sound] || PRESETS.memory
    const nextLayer = createSceneLayer(audioContext, preset, scene.id)
    nextLayer.output.connect(masterGain)

    const targetLevel = scene.emotionalPeak ? 0.62 : 0.5
    nextLayer.fadeIn(targetLevel, scene.emotionalPeak ? 2.4 : 1.7)

    if (currentLayerRef.current) {
      currentLayerRef.current.fadeOut(1.2)
      currentLayerRef.current.stopAfter(1600)
    }

    currentLayerRef.current = nextLayer
  }, [scene, enabled])

  useEffect(() => {
    const audioContext = audioContextRef.current
    const masterGain = masterGainRef.current
    if (!audioContext || !masterGain || !enabled) return

    const target = muted ? 0.0001 : clamp(volume, 0, 1)
    masterGain.gain.cancelScheduledValues(audioContext.currentTime)
    masterGain.gain.setTargetAtTime(target, audioContext.currentTime, 0.45)
  }, [muted, volume, enabled])

  return null
}
