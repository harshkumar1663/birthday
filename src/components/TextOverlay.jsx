import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EMOTIONAL_PATTERN = /(always|home|yes|choosing|answer|clear)/i

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function TextOverlay({ scene, sceneIndex, isStarted, canProceed, isLastScene, onComplete, onNext }) {
  const [typedLines, setTypedLines] = useState([])
  const [activeLine, setActiveLine] = useState(-1)
  const runIdRef = useRef(0)

  useEffect(() => {
    runIdRef.current += 1
    const runId = runIdRef.current

    if (!isStarted || !scene?.text?.length) {
      setTypedLines([])
      setActiveLine(-1)
      return undefined
    }

    const lines = scene.text
    setTypedLines(new Array(lines.length).fill(''))
    setActiveLine(-1)

    const timing = scene.textTiming || {}
    const baseDelayMs = (timing.baseDelay ?? 0.35) * 1200
    const emotionalMultiplier = timing.emotionalMultiplier ?? 1.2

    const runTyping = async () => {
      await wait(baseDelayMs)
      if (runIdRef.current !== runId) return

      for (let i = 0; i < lines.length; i += 1) {
        if (runIdRef.current !== runId) return

        const line = lines[i]

        if (line.trim().length === 0) {
          setActiveLine(-1)
          await wait(520 * emotionalMultiplier)
          continue
        }

        const isEmotional = EMOTIONAL_PATTERN.test(line)
        const lineFactor = isEmotional ? emotionalMultiplier : 1
        const charDelay = Math.min(130, Math.max(40, 44 * lineFactor))
        const lineEndDelay = 420 * lineFactor

        setActiveLine(i)
        let current = ''

        for (const ch of line) {
          if (runIdRef.current !== runId) return
          current += ch

          setTypedLines(prev => {
            const next = [...prev]
            next[i] = current
            return next
          })

          await wait(charDelay)
        }

        await wait(lineEndDelay)
      }

      if (runIdRef.current === runId) {
        setActiveLine(-1)
        onComplete?.()
      }
    }

    runTyping()

    return () => {
      runIdRef.current += 1
    }
  }, [scene, sceneIndex, isStarted, onComplete])

  return (
    <div className="text-overlay" onClick={onNext} role="button" tabIndex={0}>
      <div className={`scene-text-container ${isLastScene ? 'scene-text-final' : ''}`}>
        {(scene?.text || []).map((line, index) => {
          if (line.trim().length === 0) {
            return <div key={`pause-${index}`} className="scene-gap" />
          }

          return (
            <p
              key={`${sceneIndex}-${index}`}
              className="scene-line"
            >
              {typedLines[index] || ''}
              {activeLine === index && <span className="typing-cursor" />}
            </p>
          )
        })}
      </div>

      <motion.div
        className="continue-hint"
        initial={{ opacity: 0, y: 14 }}
        animate={canProceed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {isLastScene ? 'Breathe this in.' : 'Tap to continue'}
      </motion.div>
    </div>
  )
}