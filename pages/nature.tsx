import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import ThemeImage from '../components/ThemeImage'

const landscapes = [
  { name: 'Mountain Peak', description: 'May your achievements reach as high as these majestic peaks!' },
  { name: 'Serene Lake', description: 'Wishing you peace and tranquility like this beautiful lake!' },
  { name: 'Forest Trail', description: 'May your path forward be as beautiful as this forest trail!' },
  { name: 'Ocean Sunset', description: 'Hoping your birthday is as magical as this ocean sunset!' }
]

const Nature = () => {
  useEffect(() => {
    console.log("Nature Page loaded");
    console.log("Looking for images in:", landscapes.map(l => `/images/nature/${l.name.toLowerCase().replace(/\s+/g, '-')}.jpg`));
  }, []);

  return (
    <Layout
      title="Nature"
      description="Beautiful natural wonders for Gargi"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
          Nature
          <span className="block text-pink-400 mt-2 text-4xl md:text-6xl">Breathtaking Landscapes</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
          {landscapes.map((landscape, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform"
            >
              <div className="h-80 mb-4 overflow-hidden rounded-lg">
                <ThemeImage 
                  text={landscape.name} 
                  theme="nature"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{landscape.name}</h3>
              <p className="text-gray-200 mb-2">
                {landscape.description}
              </p>
              <div className="text-xs text-gray-400">
                Image path: /images/nature/{landscape.name.toLowerCase().replace(/\s+/g, '-')}.jpg
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default Nature 