import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Avatar3D: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#4f46e5"
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
};

export default Avatar3D;