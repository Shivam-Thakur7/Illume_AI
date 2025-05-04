import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TexturedCube = () => {
  const meshRef = useRef();

  const textures = useLoader(THREE.TextureLoader, [
    'https://picsum.photos/id/870/512/512',   // abstract grid, looks techy
  'https://picsum.photos/id/883/512/512',   // robotic vibe with wires
  'https://picsum.photos/id/903/512/512',   // glowing blue tones
  'https://picsum.photos/id/1057/512/512',  // neon-like lights
  'https://picsum.photos/id/1063/512/512',  // abstract shapes
  'https://picsum.photos/id/1076/512/512'   // chrome & blue vibes
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[6, 6, 6]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          envMapIntensity={1.2}
        />
      ))}
    </mesh>
  );
};

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center pt-24 px-4">
      {/* Text Section */}
      <div className="text-center z-20 mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 animate-text-gradient bg-[length:200%_200%]">
          Welcome to Illume AI
        </h1>
        <p className="text-gray-300 text-xl mt-3">Craft. Create. Captivate.</p>
      </div>

      {/* Cube Section */}
      <div className="w-full h-[500px]">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <TexturedCube />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
