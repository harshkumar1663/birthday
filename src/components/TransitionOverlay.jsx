import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function TransitionOverlay({ phase }) {
  const isVisible = phase === 'out' || phase === 'hold' || phase === 'in'

  const getOpacity = () => {
    if (phase === 'out') return 0.9
    if (phase === 'hold') return 1
    return 0
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="transition-overlay transition-overlay-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: getOpacity() }}
            exit={{ opacity: 0 }}
            transition={{
              duration: phase === 'in' ? 0.95 : 0.72,
              ease: phase === 'in' ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1]
            }}
          />
          <motion.div
            className="transition-overlay transition-overlay-grain"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: phase === 'in' ? 0 : 0.44, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'in' ? 0.85 : 0.66, ease: 'easeInOut' }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
