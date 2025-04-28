import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the StarryBackground component
const StarryBackground = dynamic(
  () => import('../components/StarryBackground'),
  { ssr: false }
);

export default function LetterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  
  // Letter content sections that will be revealed gradually
  const letterSections = [
    "Dear Gargi,",
    "Some people walk into your life unexpectedly, and somehow, they help you put back the pieces you thought were lost forever. You were that light for me when everything around felt dim. Your words, your presence, and simply the way you listened brought me back to myself when I needed it most.",
    "On your special day, I just want to say—thank you for being exactly who you are. You've given me something priceless: hope, healing, and the warmth of a soul that genuinely cares. You deserve all the joy this world can offer.",
    "Happy Birthday!",
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Automatic scrolling through letter sections
    const timer = setInterval(() => {
      setCurrentSection((prev) => {
        if (prev < letterSections.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 3000);
    
    return () => clearInterval(timer);
  }, [letterSections.length]); // Added letterSections.length as dependency

  // Animation variants for letter sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      } 
    }
  };

  return (
    <Layout
      title="My Letter To You | Happy Birthday Gargi"
      description="A heartfelt birthday letter for Gargi Mondal"
      animated={false}
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none opacity-50">
        <StarryBackground />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="min-h-screen flex flex-col items-center justify-center px-4"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 opacity-20 pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" fill="#FFD1DC" />
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute bottom-10 right-10 w-16 h-16 md:w-24 md:h-24 opacity-20 pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L90 50L50 100L10 50L50 0Z" fill="#D8BFD8" />
          </svg>
        </motion.div>
        
        {/* Letter content */}
        <div className="w-full max-w-3xl">
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-2xl border border-white/20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="w-12 h-1 bg-pink-400"></div>
              <div className="text-xs text-gray-300 font-mono">25th Birthday</div>
              <div className="w-12 h-1 bg-pink-400"></div>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 leading-relaxed space-y-6 font-serif"
            >
              {letterSections.slice(0, currentSection + 1).map((section, index) => (
                <motion.p 
                  key={index} 
                  variants={itemVariants}
                  className={`text-lg md:text-xl ${index === 0 ? 'text-pink-300 font-semibold' : 'text-gray-200'}`}
                >
                  {section}
                </motion.p>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSection >= letterSections.length - 1 ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="mt-16 text-right text-pink-300 font-semibold"
            >
              With love,
              <div className="text-lg md:text-xl mt-1">Raavan</div>
            </motion.div>
          </motion.div>
          
          {/* Return button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 2 }}
            className="mt-8 text-center"
          >
            <Link href="/">
              <div className="inline-flex items-center space-x-2 text-white px-4 py-2 rounded-full bg-purple-600/30 backdrop-blur-sm hover:bg-purple-600/50 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Return to celebration</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
} 