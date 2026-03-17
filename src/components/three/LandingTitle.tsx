import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { LANGUAGES, LANGUAGE_COLORS } from '../../utils/colors';

export const LandingTitle: React.FC = () => {
  const iconsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      iconsRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 1, 0]}
          fontSize={2.5}
          maxWidth={20}
          textAlign="center"
          lineHeight={1.1}
          letterSpacing={0.05}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          {'GITHUB\nSTAR\nRANKER'}
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
          />
        </Text>
      </Float>

      {/* 言語アイコンの公転 */}
      <group ref={iconsRef} position={[0, 1, 0]}>
        {LANGUAGES.map((lang, i) => {
          const angle = (i / LANGUAGES.length) * Math.PI * 2;
          const radius = 6;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const color = LANGUAGE_COLORS[lang];

          return (
            <group key={lang} position={[x, 0, z]}>
              <mesh>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshBasicMaterial color={color} />
              </mesh>
              {/* ポイントライト数を削減: 12個→4個おきに1個 */}
              {i % 3 === 0 && <pointLight color={color} intensity={1.5} distance={12} />}
            </group>
          );
        })}
      </group>
    </group>
  );
};
