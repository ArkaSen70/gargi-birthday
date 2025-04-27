'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Balloon = ({ delay, x, y }: { delay: number; x: number; y: number }) => {
  return (
    <motion.div
      initial={{ y: '100vh', x }}
      animate={{
        y: ['100vh', y],
        x: [x, x + Math.random() * 100 - 50],
      }}
      transition={{
        duration: 8 + Math.random() * 5,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="absolute"
    >
      <div className="w-8 h-10 bg-pink-500 rounded-full relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-pink-600" />
      </div>
    </motion.div>
  )
}

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState<{ delay: number; x: number; y: number }[]>([])

  useEffect(() => {
    const newBalloons = Array.from({ length: 15 }, (_, i) => ({
      delay: i * 0.5,
      x: Math.random() * window.innerWidth,
      y: -Math.random() * 200 - 100,
    }))
    setBalloons(newBalloons)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {balloons.map((balloon, i) => (
        <Balloon key={i} {...balloon} />
      ))}
    </div>
  )
} 