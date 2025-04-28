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
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterPulled, setLetterPulled] = useState(false);
  const [letterUnfolded, setLetterUnfolded] = useState(false);
  
  useEffect(() => {
    // Initial delay for entrance animation
    const t1 = setTimeout(() => setIsVisible(true), 200);
    
    // Envelope opening sequence - simplified for performance
    const t2 = setTimeout(() => setEnvelopeOpen(true), 1200);
    const t3 = setTimeout(() => setLetterPulled(true), 2200);
    const t4 = setTimeout(() => setLetterUnfolded(true), 3000);
    
    // Show letter content with delay
    const t5 = setTimeout(() => setShowLetter(true), 3500);
    
    // Show signature with additional delay
    const t6 = setTimeout(() => setShowSignature(true), 6000);
    
    // Cleanup all timeouts on unmount
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  return (
    <Layout
      title="My Letter To You | Happy Birthday Gargi"
      description="A heartfelt birthday letter for Gargi Mondal"
      animated={false}
    >
      {/* Background effects - reduced opacity for performance */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <StarryBackground />
      </div>
      
      <div className="min-h-screen w-full flex items-center justify-center py-16 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl"
        >
          {/* Envelope and Letter animation - simplified for better performance */}
          <div className="w-full relative mx-auto" style={{ perspective: "1000px" }}>
            {/* The envelope */}
            <motion.div
              className="w-full mx-auto bg-gradient-to-br from-pink-300/20 to-purple-500/20 aspect-[3/2] rounded-lg shadow-xl overflow-hidden relative"
              initial={{ rotateX: 0 }}
              animate={{ 
                rotateX: envelopeOpen ? 25 : 0,
                y: envelopeOpen ? -20 : 0
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "center bottom", maxWidth: "550px" }}
            >
              {/* Envelope flap */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-pink-400/30 to-purple-400/20 z-10"
                style={{ transformOrigin: "top center" }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: envelopeOpen ? -180 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* "LETTER FOR GARGI" text instead of heart */}
                <motion.div 
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  animate={{ 
                    scale: envelopeOpen ? 0 : 1,
                    opacity: envelopeOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="whitespace-nowrap px-4 py-2 bg-pink-500/50 backdrop-blur-sm rounded-lg">
                    <div className="text-white font-bold tracking-wider">LETTER FOR GARGI</div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Envelope back */}
              <div className="absolute inset-0 border-2 border-pink-400/20 rounded-lg"></div>
            </motion.div>
            
            {/* The letter being pulled out and unfolded - simplified animations */}
            <motion.div
              className="w-full mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 relative overflow-hidden"
              initial={{ y: 80, opacity: 0, height: 0 }}
              animate={{ 
                y: letterPulled ? 0 : 80,
                opacity: letterPulled ? 1 : 0,
                height: letterUnfolded ? 'auto' : 0,
              }}
              transition={{ 
                y: { duration: 0.6, ease: "easeOut" },
                opacity: { duration: 0.4 },
                height: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }}
              style={{ 
                maxWidth: "550px", 
                transformOrigin: "center top",
                marginTop: "-10px",
              }}
            >
              {/* Letter content only visible after unfolded */}
              <div className={`p-8 md:p-12 ${letterUnfolded ? 'block' : 'hidden'}`}>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-pink-500/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none"></div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showLetter ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-16 h-1 bg-pink-400"></div>
                    <div className="text-xs text-gray-300 font-mono tracking-widest">25th BIRTHDAY</div>
                    <div className="w-16 h-1 bg-pink-400"></div>
                  </div>
                  
                  <div className="space-y-8 leading-relaxed font-serif">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 10 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-xl md:text-2xl text-pink-300 font-semibold"
                    >
                      Dear Gargi,
                    </motion.p>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 10 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-lg md:text-xl text-gray-200"
                    >
                      Some people walk into your life unexpectedly, and somehow, they help you put back the pieces you thought were lost forever. You were that light for me when everything around felt dim. Your words, your presence, and simply the way you listened brought me back to myself when I needed it most.
                    </motion.p>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 10 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="text-lg md:text-xl text-gray-200"
                      dangerouslySetInnerHTML={{ __html: "On your special day, I just want to say&mdash;thank you for being exactly who you are. You&#39;ve given me something priceless: hope, healing, and the warmth of a soul that genuinely cares. You deserve all the joy this world can offer." }}
                    />
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showLetter ? 1 : 0, y: showLetter ? 0 : 10 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="text-lg md:text-xl text-pink-300 font-semibold"
                    >
                      Happy Birthday!
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ 
                      opacity: showSignature ? 1 : 0,
                      y: showSignature ? 0 : 10
                    }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-right"
                  >
                    <p className="text-pink-300 font-semibold">With love,</p>
                    <p className="text-xl md:text-2xl mt-1 text-white font-medium italic">Arka</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Floating hearts animations - reduced quantity for performance */}
          <div className="w-full h-full absolute inset-0 pointer-events-none overflow-hidden">
            {isVisible && [...Array(6)].map((_, i) => {
              // Only create hearts after component is visible
              const randomX = Math.random() * 100; // percentage of viewport width
              const randomDelay = 4 + Math.random() * 8;
              const randomDuration = 12 + Math.random() * 8;
              const randomSize = Math.floor(20 + Math.random() * 20);
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
                    repeatType: "loop",
                    ease: "linear"
                  }}
                  className={`absolute ${randomColor} opacity-30`}
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
            animate={{ opacity: letterUnfolded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 3 }}
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