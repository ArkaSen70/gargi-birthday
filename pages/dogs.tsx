import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import ThemeImage from '../components/ThemeImage'

const dogs = [
  { name: 'Buddy', description: 'Buddy wishes you a playful and joyful birthday!' },
  { name: 'Max', description: 'Max hopes your birthday is filled with excitement and treats!' },
  { name: 'Bailey', description: 'Bailey sends you loyal and loving birthday wishes!' },
  { name: 'Charlie', description: 'Charlie thinks you deserve the biggest bone on your birthday!' },
  { name: 'Lucy', description: 'Lucy&apos;s tail is wagging with birthday happiness for you!' },
  { name: 'Daisy', description: 'Daisy hopes your birthday is as sweet as you are!' }
]

const Dogs = () => {
  useEffect(() => {
    console.log("Dogs Page loaded");
    console.log("Looking for images in:", dogs.map(d => `/images/dogs/${d.name.toLowerCase().replace(/\s+/g, '-')}.jpg`));
  }, []);

  return (
    <Layout
      title="Dogs"
      description="Gargi&apos;s loyal canine friends"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
          Dogs
          <span className="block text-pink-400 mt-2 text-4xl md:text-6xl">Loyal Canine Companions</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {dogs.map((dog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform"
            >
              <div className="h-80 mb-4 overflow-hidden rounded-lg">
                <ThemeImage 
                  text={dog.name} 
                  theme="dogs"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dog.name}</h3>
              <p className="text-gray-200 mb-2">
                {dog.description}
              </p>
              <div className="text-xs text-gray-400">
                Image path: /images/dogs/{dog.name.toLowerCase().replace(/\s+/g, '-')}.jpg
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default Dogs 