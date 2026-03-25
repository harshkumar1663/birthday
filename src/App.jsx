import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Canvas3D from './components/Canvas3D'
import TextOverlay from './components/TextOverlay'
import TransitionOverlay from './components/TransitionOverlay'
import SoundManager from './components/SoundManager'
import { SCENES } from './scenes'

const TRANSITION_MS = 1400

export default function App() {
  const [currentScene, setCurrentScene] = useState(0)
  const [canProceed, setCanProceed] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState('idle')
  const [isStarted, setIsStarted] = useState(false)
  const timersRef = useRef([])

  const activeScene = useMemo(() => SCENES[currentScene], [currentScene])
  const isLastScene = currentScene === SCENES.length - 1

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const schedule = useCallback((fn, delay) => {
    const timer = setTimeout(fn, delay)
    timersRef.current.push(timer)
  }, [])

  const handleTextComplete = useCallback(() => {
    setCanProceed(true)
  }, [])

  const handleNext = useCallback(() => {
    if (!canProceed || isLastScene) return

    setCanProceed(false)
    setTransitionPhase('out')

    schedule(() => {
      setCurrentScene(prev => prev + 1)
      setTransitionPhase('hold')

      schedule(() => {
        setTransitionPhase('in')

        schedule(() => {
          setTransitionPhase('idle')
        }, TRANSITION_MS * 0.36)
      }, TRANSITION_MS * 0.12)
    }, TRANSITION_MS * 0.22)
  }, [canProceed, isLastScene, schedule])

  const handleStart = useCallback(() => {
    setIsStarted(true)
  }, [])

  return (
    <div className="app">
      <Canvas3D scene={activeScene} transitionPhase={transitionPhase} />

      <TextOverlay
        scene={activeScene}
        sceneIndex={currentScene}
        isStarted={isStarted}
        canProceed={canProceed}
        isLastScene={isLastScene}
        onComplete={handleTextComplete}
        onNext={handleNext}
      />

      <TransitionOverlay phase={transitionPhase} />

      <SoundManager
        scene={activeScene}
        enabled={isStarted}
      />

      <AnimatePresence>
        {!isStarted && (
          <motion.div
            key="start-overlay"
            className="start-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.button
              className="start-button"
              onClick={handleStart}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              Click to open your birthday surprise !
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}