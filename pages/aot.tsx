import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import ThemeImage from '../components/ThemeImage'

const aotScenes = [
  { name: 'Eren Transformation', description: 'Just like how Eren transforms, may your birthday transform your life!' },
  { name: 'Levi vs Beast Titan', description: 'May you overcome challenges as skillfully as Captain Levi!' },
  { name: 'Mikasa in Battle', description: 'Be strong and determined like Mikasa on your special day!' },
  { name: 'Colossal Titan Reveal', description: 'May your birthday be as epic as the colossal titan reveal!' }
]

const AttackOnTitan = () => {
  useEffect(() => {
    console.log("AOT Page loaded");
    console.log("Looking for images in:", aotScenes.map(s => `/images/aot/${s.name.toLowerCase().replace(/\s+/g, '-')}.jpg`));
  }, []);

  return (
    <Layout
      title="Attack on Titan"
      description="Gargi&apos;s favorite anime"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
          Attack on Titan
          <span className="block text-pink-400 mt-2 text-4xl md:text-6xl">Gargi&apos;s Favorite Anime</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
          {aotScenes.map((scene, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-500"
            >
              <div className="h-80 mb-4 overflow-hidden rounded-lg">
                <ThemeImage 
                  text={scene.name} 
                  theme="aot"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{scene.name}</h3>
              <p className="text-gray-200 mb-2">
                {scene.description}
              </p>
              <div className="text-xs text-gray-400">
                Image path: /images/aot/{scene.name.toLowerCase().replace(/\s+/g, '-')}.jpg
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default AttackOnTitan 