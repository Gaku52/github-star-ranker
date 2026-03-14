import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { LANGUAGE_COLORS } from '../../utils/colors';

interface Props {
  activeLanguage: string | null;
}

export const StarField: React.FC<Props> = ({ activeLanguage }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nebulaColor = activeLanguage ? LANGUAGE_COLORS[activeLanguage] : '#ffffff';

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={80} depth={60} count={3000} factor={6} saturation={0} fade speed={1} />

      {/* 遠景の星雲 */}
      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial
          color={nebulaColor}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
