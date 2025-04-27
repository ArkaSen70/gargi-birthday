'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const colors: string[] = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5']

interface ConfettiPieceProps {
  delay: number;
  x: number;
  color: string;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ delay, x, color }) => {
  return (
    <motion.div
      initial={{ y: -10, x, rotate: 0, opacity: 0 }}
      animate={{
        y: ['0vh', '100vh'],
        x: [x, x + Math.random() * 200 - 100],
        rotate: [0, 360 * Math.random() * 5],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 5 + Math.random() * 5,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="absolute"
    >
      <div
        className="w-2 h-2"
        style={{ backgroundColor: color, transform: 'rotate(45deg)' }}
      />
    </motion.div>
  )
}

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([])

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }, () => ({
      delay: Math.random() * 5,
      x: Math.random() * window.innerWidth,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}
    </div>
  )
}

export default Confetti 