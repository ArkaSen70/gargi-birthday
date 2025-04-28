import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRouter } from 'next/router';
import * as THREE from 'three';

// Create a heart shape that can be used in the component
const createHeartShape = () => {
  const heartShape = new THREE.Shape();
  
  heartShape.moveTo(0, 0.25);
  heartShape.bezierCurveTo(0, 0.25, -0.25, 0, -0.5, 0.25);
  heartShape.bezierCurveTo(-0.75, 0.75, -0.5, 0.75, 0, 0.75);
  heartShape.bezierCurveTo(0.5, 0.75, 0.75, 0.75, 0.5, 0.25);
  heartShape.bezierCurveTo(0.25, 0, 0, 0.25, 0, 0.25);
  
  return heartShape;
};

const LetterButton = () => {
  const router = useRouter();
  const envelope = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Animation for envelope hover and click
  useFrame(() => {
    if (envelope.current) {
      envelope.current.rotation.y = THREE.MathUtils.lerp(
        envelope.current.rotation.y,
        hovered ? 0.2 : 0,
        0.1
      );
      
      envelope.current.scale.x = THREE.MathUtils.lerp(
        envelope.current.scale.x,
        hovered ? 1.1 : 1,
        0.1
      );
      
      envelope.current.scale.y = THREE.MathUtils.lerp(
        envelope.current.scale.y,
        hovered ? 1.1 : 1,
        0.1
      );
      
      envelope.current.scale.z = THREE.MathUtils.lerp(
        envelope.current.scale.z,
        hovered ? 1.1 : 1,
        0.1
      );
    }
  });

  const handleClick = () => {
    setActive(true);
    
    // Navigate to the letter page
    setTimeout(() => {
      router.push('/my-letter');
    }, 600);
  };

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
    >
      <group
        ref={envelope}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Envelope base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial color="#f8e7db" roughness={0.5} metalness={0.2} />
        </mesh>
        
        {/* Envelope sides */}
        <mesh position={[0, 0.3, 1]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <planeGeometry args={[3, 1]} />
          <meshStandardMaterial color="#f5d7c4" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        
        <mesh position={[0, 0.3, -1]} rotation={[-Math.PI / 4, 0, 0]} castShadow>
          <planeGeometry args={[3, 1]} />
          <meshStandardMaterial color="#f5d7c4" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        
        <mesh position={[-1.5, 0.3, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <planeGeometry args={[2, 1]} />
          <meshStandardMaterial color="#f5d7c4" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        
        <mesh position={[1.5, 0.3, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow>
          <planeGeometry args={[2, 1]} />
          <meshStandardMaterial color="#f5d7c4" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Envelope flap */}
        <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 4, 0, 0]} castShadow>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color="#f0c4a9" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Heart seal - using simple box for now to avoid geometry issues */}
        <mesh position={[0, 0.31, 0]} scale={[0.4, 0.4, 0.4]} castShadow>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#ff6b8b" roughness={0.3} metalness={0.4} />
        </mesh>
        
        {/* Text */}
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.3}
          color="#553c33"
          anchorX="center"
          anchorY="middle"
        >
          Letter
        </Text>
      </group>
    </Float>
  );
};

export default LetterButton; 