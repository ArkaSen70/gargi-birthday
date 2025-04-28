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

export default function MyLetterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  
  useEffect(() => {
    // Initial delay for entrance animation
    setTimeout(() => setIsVisible(true), 200);
    
    // Show letter content with delay
    setTimeout(() => setShowLetter(true), 1500);
    
    // Show signature with additional delay
    setTimeout(() => setShowSignature(true), 6000);
  }, []);

  return (
    <Layout
      title="My Letter To You | Happy Birthday Gargi"
      description="A heartfelt birthday letter for Gargi Mondal"
      animated={false}
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none opacity-60">
        <StarryBackground />
      </div>
      
      <div className="min-h-screen w-full flex items-center justify-center py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.9,
            y: isVisible ? 0 : 50
          }}
          transition={{ 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="w-full max-w-3xl"
        >
          {/* Envelope opening animation */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: showLetter ? 1 : 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5 
            }}
            style={{ originY: 0 }}
            className="w-full"
          >
            {/* Letter content */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-pink-500/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none"></div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: showLetter ? 1 : 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="w-16 h-1 bg-pink-400"></div>
                  <div className="text-xs text-gray-300 font-mono tracking-widest">25th BIRTHDAY</div>
                  <div className="w-16 h-1 bg-pink-400"></div>
                </div>
                
                <div className="space-y-8 leading-relaxed font-serif">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-xl md:text-2xl text-pink-300 font-semibold"
                  >
                    Dear Gargi,
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="text-lg md:text-xl text-gray-200"
                  >
                    Some people walk into your life unexpectedly, and somehow, they help you put back the pieces you thought were lost forever. You were that light for me when everything around felt dim. Your words, your presence, and simply the way you listened brought me back to myself when I needed it most.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="text-lg md:text-xl text-gray-200"
                  >
                    On your special day, I just want to say—thank you for being exactly who you are. You've given me something priceless: hope, healing, and the warmth of a soul that genuinely cares. You deserve all the joy this world can offer.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 3.4 }}
                    className="text-lg md:text-xl text-pink-300 font-semibold"
                  >
                    Happy Birthday!
                  </motion.p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ 
                    opacity: showSignature ? 1 : 0,
                    y: showSignature ? 0 : 20
                  }}
                  transition={{ duration: 0.8 }}
                  className="mt-16 text-right"
                >
                  <p className="text-pink-300 font-semibold">With love,</p>
                  <p className="text-xl md:text-2xl mt-1 text-white font-medium italic">Arka</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Floating hearts animations */}
          <div className="w-full h-full absolute inset-0 pointer-events-none overflow-hidden">
            {isVisible && [...Array(12)].map((_, i) => {
              // Only create hearts after component is visible
              const randomX = Math.random() * 100; // percentage of viewport width
              const randomDelay = 3 + Math.random() * 10;
              const randomDuration = 10 + Math.random() * 15;
              const randomSize = Math.floor(20 + Math.random() * 30);
              const randomColor = ["text-pink-300", "text-pink-400", "text-purple-300", "text-red-300"][
                Math.floor(Math.random() * 4)
              ];
              
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    x: `${randomX}vw`, 
                    y: '110vh',
                    scale: 0.5 + Math.random() * 0.5,
                    rotate: Math.random() * 360
                  }}
                  animate={{ 
                    y: '-10vh',
                    rotate: Math.random() * 720 - 360
                  }}
                  transition={{ 
                    delay: randomDelay,
                    duration: randomDuration,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className={`absolute ${randomColor} opacity-40`}
                  style={{ fontSize: `${randomSize}px` }}
                >
                  ❤
                </motion.div>
              );
            })}
          </div>
          
          {/* Return button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showLetter ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 4 }}
            className="mt-10 text-center"
          >
            <Link href="/">
              <div className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600/70 hover:to-pink-600/70 backdrop-blur-sm transition-all cursor-pointer shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Return to celebration</span>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
} 