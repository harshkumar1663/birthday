import React, { useState, useEffect } from 'react'

const TYPING_SPEED = 32 // milliseconds per character
const LINE_DELAY = 400 // milliseconds between lines
const PAUSE_DELAY = 900 // milliseconds for empty lines

export default function SceneText({ lines }) {
  const [displayedLines, setDisplayedLines] = useState(Array(lines.length).fill(''))

  useEffect(() => {
    const typeLines = async () => {
      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const lineText = lines[lineIdx]

        if (lineText === '') {
          // Pause for dramatic effect
          await new Promise(resolve => setTimeout(resolve, PAUSE_DELAY))
          continue
        }

        // Type each character
        for (let charIdx = 0; charIdx <= lineText.length; charIdx++) {
          await new Promise(resolve => setTimeout(resolve, TYPING_SPEED))

          setDisplayedLines(prev => {
            const newLines = [...prev]
            newLines[lineIdx] = lineText.substring(0, charIdx)
            return newLines
          })
        }

        // Delay before next line
        if (lineIdx < lines.length - 1) {
          await new Promise(resolve => setTimeout(resolve, LINE_DELAY))
        }
      }
    }

    typeLines()
  }, [lines])

  return (
    <div className="scene-text-container">
      {displayedLines.map((line, idx) => (
        <div
          key={idx}
          className="scene-line"
          style={{ minHeight: line === '' ? '1.5em' : 'auto' }}
        >
          {line}
          {line === displayedLines[idx] && line !== lines[idx] && (
            <span className="cursor" />
          )}
        </div>
      ))}
    </div>
  )
}
