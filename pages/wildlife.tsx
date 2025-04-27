import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import ThemeImage from '../components/ThemeImage'

const animals = [
  { name: 'Majestic Lion', description: 'May you have the courage of a lion on your birthday and beyond!' },
  { name: 'Graceful Elephant', description: 'Wishing you wisdom and strength like these gentle giants!' },
  { name: 'Playful Dolphins', description: 'May your birthday be filled with joy and playfulness!' },
  { name: 'Soaring Eagle', description: 'Soar to new heights in the coming year!' },
  { name: 'Colorful Parrot', description: 'May your birthday be as vibrant and colorful as these birds!' },
  { name: 'Peaceful Giraffe', description: 'Standing tall and reaching for the stars on your special day!' }
]

const Wildlife = () => {
  useEffect(() => {
    console.log("Wildlife Page loaded");
    console.log("Looking for images in:", animals.map(a => `/images/wildlife/${a.name.toLowerCase().replace(/\s+/g, '-')}.jpg`));
  }, []);

  return (
    <Layout
      title="Wildlife"
      description="Magnificent creatures from the animal kingdom"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
          Wildlife
          <span className="block text-pink-400 mt-2 text-4xl md:text-6xl">Magnificent Creatures</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {animals.map((animal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform"
            >
              <div className="h-80 mb-4 overflow-hidden rounded-lg">
                <ThemeImage 
                  text={animal.name} 
                  theme="wildlife"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{animal.name}</h3>
              <p className="text-gray-200 mb-2">
                {animal.description}
              </p>
              <div className="text-xs text-gray-400">
                Image path: /images/wildlife/{animal.name.toLowerCase().replace(/\s+/g, '-')}.jpg
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default Wildlife 