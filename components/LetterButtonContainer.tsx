import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useProgress } from '@react-three/drei';
import LetterButton from './LetterButton';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Loading indicator for when the 3D elements are loading
function Loader() {
  const { progress } = useProgress();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-white text-xl">Loading Letter</div>
      <div className="w-40 h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Fallback button if 3D fails to load
function FallbackButton() {
  return (
    <Link href="/my-letter">
      <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
        <div className="bg-gradient-to-br from-pink-500/80 to-purple-600/80 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 shadow-lg">
          <div className="text-white font-bold text-xl mb-2">💌 A Letter For You</div>
          <div className="text-white/80 text-sm">Click to read my special message</div>
        </div>
      </div>
    </Link>
  );
}

// 3D Canvas component with error boundary
function ThreeDCanvas() {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.4} 
        penumbra={1} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={1024} 
      />
      <spotLight 
        position={[-5, 5, 5]} 
        angle={0.4} 
        penumbra={1} 
        intensity={0.5} 
        castShadow 
        shadow-mapSize={1024} 
      />
      <LetterButton />
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}

const LetterButtonContainer: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check if we're in the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If there's an error or we're not on client side yet, show the fallback
  if (hasError || !isClient) {
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
          
          <div className="h-52 md:h-64 w-full relative rounded-xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-700/20 backdrop-blur-sm p-2 shadow-xl">
            <FallbackButton />
          </div>
        </div>
      </motion.div>
    );
  }

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
            Click the envelope to read my letter to you
          </p>
        </div>
        
        <div className="h-52 md:h-72 w-full relative rounded-xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-700/20 backdrop-blur-sm p-2 shadow-xl">
          <Suspense fallback={<Loader />}>
            <ErrorBoundary onError={() => setHasError(true)}>
              <ThreeDCanvas />
            </ErrorBoundary>
          </Suspense>
          
          {/* Sparkle effects */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
        </div>
      </div>
    </motion.div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode, onError: () => void }> {
  componentDidCatch(error: Error) {
    // Call the onError callback when an error is caught
    console.error('Error in letter button:', error.message);
    this.props.onError();
  }
  
  render() {
    return this.props.children;
  }
}

export default LetterButtonContainer; 