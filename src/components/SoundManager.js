import { useEffect, useRef } from 'react'

const PRESETS = {
  memory: { root: 261.63, density: 0.82, brightness: 0.55 },
  warm: { root: 293.66, density: 0.95, brightness: 0.62 },
  dim: { root: 246.94, density: 0.75, brightness: 0.48 },
  bright: { root: 329.63, density: 1.02, brightness: 0.7 },
  finale: { root: 392, density: 1.12, brightness: 0.78 }
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function createImpulseResponse(audioContext, length = 2.8, decay = 2.6) {
  const sampleRate = audioContext.sampleRate
  const size = Math.floor(sampleRate * length)
  const impulse = audioContext.createBuffer(2, size, sampleRate)

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const data = impulse.getChannelData(channel)
    for (let i = 0; i < size; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / size, decay)
    }
  }

  return impulse
}

function createHammerNoise(audioContext) {
  const size = Math.floor(audioContext.sampleRate * 0.07)
  const buffer = audioContext.createBuffer(1, size, audioContext.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < size; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / size)
  }

  return buffer
}

function triggerPianoNote(audioContext, frequency, destination, velocity, brightness, noiseBuffer) {
  const now = audioContext.currentTime
  const toneA = audioContext.createOscillator()
  const toneB = audioContext.createOscillator()
  const envelope = audioContext.createGain()
  const noteFilter = audioContext.createBiquadFilter()
  const hammer = audioContext.createBufferSource()
  const hammerFilter = audioContext.createBiquadFilter()
  const hammerGain = audioContext.createGain()

  toneA.type = 'triangle'
  toneB.type = 'triangle'
  toneA.frequency.value = frequency
  toneB.frequency.value = frequency * 2
  toneB.detune.value = 3

  noteFilter.type = 'lowpass'
  noteFilter.frequency.value = 1800 + brightness * 2600
  noteFilter.Q.value = 0.4

  const peak = clamp(0.06 * velocity, 0.02, 0.095)
  envelope.gain.setValueAtTime(0.0001, now)
  envelope.gain.linearRampToValueAtTime(peak, now + 0.01)
  envelope.gain.exponentialRampToValueAtTime(peak * 0.42, now + 0.16)
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.7)

  hammer.buffer = noiseBuffer
  hammerFilter.type = 'bandpass'
  hammerFilter.frequency.value = 1800 + Math.random() * 1200
  hammerFilter.Q.value = 0.5
  hammerGain.gain.setValueAtTime(0.015 * velocity, now)
  hammerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

  toneA.connect(noteFilter)
  toneB.connect(noteFilter)
  noteFilter.connect(envelope)
  envelope.connect(destination)

  hammer.connect(hammerFilter)
  hammerFilter.connect(hammerGain)
  hammerGain.connect(destination)

  toneA.start(now)
  toneB.start(now)
  hammer.start(now)

  toneA.stop(now + 1.9)
  toneB.stop(now + 1.9)
  hammer.stop(now + 0.1)
}

function createSceneLayer(audioContext, preset, sceneKey, emotionalPeak = false) {
  const output = audioContext.createGain()
  const dry = audioContext.createGain()
  const wet = audioContext.createGain()
  const reverb = audioContext.createConvolver()
  const highPass = audioContext.createBiquadFilter()
  const masterFilter = audioContext.createBiquadFilter()
  const hammerNoise = createHammerNoise(audioContext)

  const scale = [0, 2, 4, 7, 9, 12]
  let isStopped = false
  let timer = null

  output.gain.value = 0.0001
  dry.gain.value = 0.85
  wet.gain.value = emotionalPeak ? 0.31 : 0.24

  highPass.type = 'highpass'
  highPass.frequency.value = 120

  masterFilter.type = 'lowpass'
  masterFilter.frequency.value = 3200 + preset.brightness * 2200

  reverb.buffer = createImpulseResponse(audioContext)

  dry.connect(highPass)
  highPass.connect(masterFilter)
  masterFilter.connect(output)

  highPass.connect(reverb)
  reverb.connect(wet)
  wet.connect(output)

  let step = (sceneKey || '').length % scale.length

  const playStep = () => {
    if (isStopped) return

    const octave = emotionalPeak ? (step % 2 === 0 ? 1 : 2) : step % 3 === 0 ? 0.5 : 1
    const semitone = scale[step % scale.length]
    const freq = preset.root * octave * Math.pow(2, semitone / 12)
    const velocity = emotionalPeak ? 1.05 : 0.9 + Math.random() * 0.15

    triggerPianoNote(audioContext, freq, dry, velocity, preset.brightness, hammerNoise)

    // Occasionally drop a higher harmony note for cinematic lift.
    if (Math.random() > (emotionalPeak ? 0.48 : 0.7)) {
      triggerPianoNote(
        audioContext,
        freq * 2,
        dry,
        velocity * 0.52,
        preset.brightness + 0.08,
        hammerNoise
      )
    }

    step += 1
    const interval = (900 + Math.random() * 950) / preset.density
    timer = window.setTimeout(playStep, interval)
  }

  timer = window.setTimeout(playStep, 360)

  return {
    output,
    fadeIn(level, duration) {
      output.gain.cancelScheduledValues(audioContext.currentTime)
      output.gain.setTargetAtTime(clamp(level, 0, 1), audioContext.currentTime, duration)
    },
    fadeOut(duration) {
      output.gain.cancelScheduledValues(audioContext.currentTime)
      output.gain.setTargetAtTime(0.0001, audioContext.currentTime, duration)
    },
    stopAfter(ms) {
      isStopped = true
      if (timer) {
        window.clearTimeout(timer)
        timer = null
      }

      output.gain.cancelScheduledValues(audioContext.currentTime)
      output.gain.setTargetAtTime(0.0001, audioContext.currentTime, ms / 2200)
    }
  }
}

export default function SoundManager({ scene, enabled }) {
  const contextRef = useRef(null)
  const masterRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    if (!enabled || contextRef.current) return

    const context = new (window.AudioContext || window.webkitAudioContext)()
    const master = context.createGain()

    master.gain.value = 0.0001
    master.connect(context.destination)

    contextRef.current = context
    masterRef.current = master

    if (context.state === 'suspended') {
      context.resume().catch(() => {})
    }

    return () => {
      if (layerRef.current) {
        layerRef.current.fadeOut(0.35)
        layerRef.current.stopAfter(420)
        layerRef.current = null
      }

      context.close().catch(() => {})
      contextRef.current = null
      masterRef.current = null
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || !scene) return

    const context = contextRef.current
    const master = masterRef.current
    if (!context || !master) return

    if (context.state === 'suspended') {
      context.resume().catch(() => {})
    }

    const preset = PRESETS[scene.sound] || PRESETS.memory
    const nextLayer = createSceneLayer(context, preset, scene.id, Boolean(scene.emotionalPeak))
    nextLayer.output.connect(master)
    nextLayer.fadeIn(scene.emotionalPeak ? 0.52 : 0.42, scene.emotionalPeak ? 1.5 : 1)

    if (layerRef.current) {
      layerRef.current.fadeOut(0.9)
      layerRef.current.stopAfter(1200)
    }

    layerRef.current = nextLayer
  }, [scene, enabled])

  return null
}
