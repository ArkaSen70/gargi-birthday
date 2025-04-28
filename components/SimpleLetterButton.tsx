import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SimpleLetterButton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full mt-10 mb-16 mx-auto relative"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-5">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            A Special Message For You
          </h3>
          <p className="text-purple-300">
            Click below to read my letter to you
          </p>
        </div>
        
        <Link href="/my-letter">
          <div className="relative overflow-hidden group">
            {/* Animated envelope */}
            <div className="h-52 md:h-64 w-full rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-700/30 backdrop-blur-sm p-6 shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform group-hover:scale-[0.98]">
              {/* Envelope top */}
              <div className="w-24 h-16 relative mb-2">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-pink-300/50 overflow-hidden rounded-t-xl">
                  <div className="w-[50%] h-full absolute left-0 top-0 bg-gradient-to-r from-pink-400/20 to-transparent" />
                  <div className="w-[50%] h-full absolute right-0 top-0 bg-gradient-to-l from-pink-400/20 to-transparent" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-pink-300 text-sm">Open Me</span>
                </div>
              </div>
              
              {/* Envelope body */}
              <div className="w-32 h-20 bg-gradient-to-b from-pink-400/20 to-purple-400/20 rounded-md border border-white/10 shadow-lg flex items-center justify-center relative overflow-hidden group-hover:bg-pink-400/30 transition-all duration-300">
                {/* Letter peeking out */}
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: [10, 0, 10] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="w-28 h-14 bg-white/20 backdrop-blur-sm rounded-t-sm absolute -bottom-2 shadow-md"
                >
                  <div className="w-full h-1 bg-pink-400/40 absolute top-3 left-0"></div>
                  <div className="w-full h-1 bg-pink-400/40 absolute top-7 left-0"></div>
                  <div className="w-[80%] h-1 bg-pink-400/40 absolute top-11 left-[10%]"></div>
                </motion.div>
              </div>
              
              <div className="text-white font-bold text-xl mt-5">My Letter to You</div>
              
              {/* Sparkle effects */}
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
            </div>
            
            {/* Hover instruction */}
            <div className="absolute bottom-3 left-0 right-0 text-center text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to read my letter
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default SimpleLetterButton; 