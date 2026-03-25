import React, { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

const EMOTIONAL_PATTERN = /(always|home|yes|choosing|answer|clear)/i

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: 'blur(8px)'
  },
  visible: custom => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: custom.delay,
      duration: custom.duration,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

export default function TextOverlay({ scene, sceneIndex, canProceed, isLastScene, onComplete, onNext }) {
  const completeTimer = useRef(null)

  const plan = useMemo(() => {
    if (!scene?.text?.length) return []

    const timing = scene.textTiming || {}
    const baseDelay = timing.baseDelay ?? 0.35
    const stagger = timing.stagger ?? 0.9
    const emotionalMultiplier = timing.emotionalMultiplier ?? 1.2

    let runningDelay = baseDelay

    return scene.text.map(line => {
      if (line.trim().length === 0) {
        runningDelay += 0.42 * emotionalMultiplier
        return {
          line,
          isPause: true,
          delay: runningDelay,
          duration: 0.2
        }
      }

      const lineFactor = EMOTIONAL_PATTERN.test(line) ? emotionalMultiplier : 1
      const duration = Math.min(2, Math.max(0.72, line.length * 0.043 * lineFactor))

      const entry = {
        line,
        isPause: false,
        delay: runningDelay,
        duration
      }

      runningDelay += stagger * lineFactor
      return entry
    })
  }, [scene])

  useEffect(() => {
    if (!plan.length) return undefined

    const total = plan.reduce((max, entry) => {
      return Math.max(max, entry.delay + entry.duration)
    }, 0)

    if (completeTimer.current) {
      clearTimeout(completeTimer.current)
    }

    completeTimer.current = setTimeout(() => {
      onComplete?.()
    }, total * 1000 + 220)

    return () => {
      if (completeTimer.current) {
        clearTimeout(completeTimer.current)
      }
    }
  }, [plan, onComplete, sceneIndex])

  return (
    <div className="text-overlay" onClick={onNext} role="button" tabIndex={0}>
      <div className={`scene-text-container ${isLastScene ? 'scene-text-final' : ''}`}>
        {plan.map((entry, index) => {
          if (entry.isPause) {
            return <div key={`pause-${index}`} className="scene-gap" />
          }

          return (
            <motion.p
              key={`${sceneIndex}-${index}`}
              className="scene-line"
              custom={{ delay: entry.delay, duration: entry.duration }}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              {entry.line}
            </motion.p>
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