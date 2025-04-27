import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import ThemeImage from '../components/ThemeImage'

const cats = [
  { name: 'Whiskers', description: 'This fluffy friend wishes you many purr-fect moments!' },
  { name: 'Mittens', description: 'Mittens hopes your birthday is as cozy as a cat nap!' },
  { name: 'Shadow', description: 'May your day be filled with playful joy like Shadow!' },
  { name: 'Luna', description: 'Luna sends magical birthday wishes your way!' },
  { name: 'Oliver', description: 'Oliver thinks you deserve all the treats on your birthday!' },
  { name: 'Bella', description: 'Beautiful Bella hopes your day is as wonderful as you are!' }
]

const Cats = () => {
  useEffect(() => {
    console.log("Cats Page loaded");
    console.log("Looking for images in:", cats.map(c => `/images/cats/${c.name.toLowerCase().replace(/\s+/g, '-')}.jpg`));
  }, []);

  return (
    <Layout
      title="Cats"
      description="Gargi's favorite furry friends"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
          Cats
          <span className="block text-pink-400 mt-2 text-4xl md:text-6xl">Adorable Feline Friends</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {cats.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform"
            >
              <div className="h-80 mb-4 overflow-hidden rounded-lg">
                <ThemeImage 
                  text={cat.name} 
                  theme="cats"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-gray-200 mb-2">
                {cat.description}
              </p>
              <div className="text-xs text-gray-400">
                Image path: /images/cats/{cat.name.toLowerCase().replace(/\s+/g, '-')}.jpg
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default Cats 