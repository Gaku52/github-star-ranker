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
      {/* Stars count を 3000→1500 に削減、nebulaセグメント数も 32→16 に削減 */}
      <Stars radius={80} depth={60} count={1500} factor={6} saturation={0} fade speed={1} />

      {/* 遠景の星雲（球体で包むことでエッジを消す） */}
      <mesh>
        <sphereGeometry args={[60, 16, 16]} />
        <meshBasicMaterial
          color={nebulaColor}
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};
