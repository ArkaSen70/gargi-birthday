import React, { useRef, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// Optimize the moving stars by reducing the count
const MovingStars = memo(({ speed = 0.05 }) => {
  const starsRef = useRef<THREE.Points>(null)
  
  useFrame(({ clock }) => {
    if (starsRef.current) {
      // Optimize the animation for better performance
      starsRef.current.rotation.y = clock.getElapsedTime() * speed
      starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.03
    }
  })
  
  return (
    <Stars 
      ref={starsRef}
      radius={80} 
      depth={40} 
      count={2000} // Reduced count for better performance
      factor={4} 
      saturation={0} 
      fade 
      speed={0.5} // Reduced speed for better performance
    />
  )
})

// Use React.memo to prevent unnecessary re-renders
const StarryBackground = memo(({ animated = true }) => {
  // For non-animated version, use even fewer stars
  return (
    <div className="fixed inset-0 z-0">
      <Canvas dpr={[1, 1.5]} performance={{ min: 0.1 }}>
        {animated ? (
          <MovingStars />
        ) : (
          <Stars 
            radius={80} 
            depth={40} 
            count={1500} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0}
          />
        )}
      </Canvas>
    </div>
  )
})

export default StarryBackground 