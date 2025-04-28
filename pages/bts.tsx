import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import ThemeImage from '../components/ThemeImage'

const btsMembers = [
  { name: 'RM', description: 'Happy Birthday from your favorite leader!' },
  { name: 'Jin', description: 'Wishing you a worldwide handsome birthday!' },
  { name: 'Suga', description: 'May your special day be as incredible as you are!' },
  { name: 'J-Hope', description: 'Hope your day is full of sunshine and smiles!' },
  { name: 'Jimin', description: 'Sending you the sweetest birthday wishes!' },
  { name: 'V', description: 'Have the most beautiful birthday, just like you!' },
  { name: 'Jungkook', description: 'Golden maknae wishes you a golden birthday!' }
]

const BTS: React.FC = () => {
  useEffect(() => {
    // Remove console logs in production to improve performance
    if (process.env.NODE_ENV === 'development') {
    console.log("BTS Page loaded");
    console.log("Looking for images in:", btsMembers.map(m => `/images/bts/${m.name.toLowerCase().replace(/\s+/g, '-')}.jpg`));
    }
  }, []);

  return (
    <Layout
      title="BTS"
      description="Gargi&apos;s favorite K-pop group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
          BTS
          <span className="block text-pink-400 mt-2 text-4xl md:text-6xl">Gargi&apos;s Favorite K-pop Group</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {btsMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform"
            >
              <div className="h-80 mb-4 overflow-hidden rounded-lg">
                <ThemeImage 
                  text={member.name} 
                  theme="bts"
                  className="rounded-lg"
                  priority={index < 3} // Prioritize first 3 images (above the fold)
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-gray-200 mb-2">
                {member.description}
              </p>
              <div className="text-xs text-gray-400">
                Image path: /images/bts/{member.name.toLowerCase().replace(/\s+/g, '-')}.jpg
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}

export default BTS 