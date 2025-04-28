import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import FloatingBalloons from '../components/FloatingBalloons'
import Confetti from '../components/Confetti'
import Layout from '../components/Layout'
import Link from 'next/link'
import SimpleLetterButton from '../components/SimpleLetterButton'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => setShowMessage(true), 2000)
  }, [])

  return (
    <Layout
      title="Happy Birthday Gargi!"
      description="A special birthday celebration for Gargi Mondal"
      animated={false}
    >
      {/* Animated Elements */}
      <FloatingBalloons />
      <Confetti />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl md:text-9xl font-bold text-white mb-6"
        >
          Happy Birthday
          <span className="block text-pink-400 mt-2">Gargi</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl md:text-3xl text-gray-200 mb-12"
        >
          Celebrating 25 years of your amazing journey
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="inline-block"
        >
          <div className="bg-white-10 backdrop-blur-lg rounded-full p-12 shadow-2xl transform hover:scale-105 transition-transform">
            <div className="text-6xl md:text-8xl font-bold text-white">
              25
            </div>
          </div>
        </motion.div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-16"
          >
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              May this special day bring you joy, laughter, and countless beautiful memories.
              Here&apos;s to celebrating you and all the wonderful moments that lie ahead!
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 space-y-6"
            >
              <Link href="/surprise-gifts">
                <div className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-full hover:shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer">
                  Surprise Gift
                </div>
              </Link>
              
              {/* Simple Letter Button - more reliable than the 3D version */}
              <SimpleLetterButton />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  )
} 