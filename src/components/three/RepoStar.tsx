import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { Repository } from '../../types/github';

interface Props {
  repo: Repository;
  position: THREE.Vector3;
  color: string;
  rank: number;
  delayIndex: number;
  isActive: boolean;
  onClick: (repo: Repository, position: THREE.Vector3) => void;
}

export const RepoStar: React.FC<Props> = ({ repo, position, color, rank, delayIndex, isActive, onClick }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const baseSize = 0.3 + Math.log10(repo.stargazers_count) * 0.15;
  const emissiveIntensity = 1.0 + ((30 - rank) / 30) * 2.0;

  // useFrame 内での Vector3 アロケーション削減用
  const cameraPos = useRef(new THREE.Vector3());

  const springs = useSpring({
    scale: hovered ? 1.3 : 1,
    starOpacity: isActive ? 1 : 0.15,
    from: { scale: 0, starOpacity: 0 },
    delay: delayIndex * 50,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
      cameraPos.current.copy(state.camera.position);
      ringRef.current.lookAt(cameraPos.current);
    }
  });

  return (
    <animated.group
      position={[position.x, position.y, position.z]}
      scale={springs.scale}
    >
      {/* 星本体: セグメント数を 64→16 に削減、PhysicalMaterial→StandardMaterial に変更 */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onClick(repo, position); }}
      >
        <sphereGeometry args={[baseSize, 16, 16]} />
        <animated.meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={springs.starOpacity}
        />
      </mesh>

      {/* グロウリング: セグメント数を 32→16 に削減 */}
      <mesh ref={ringRef}>
        <ringGeometry args={[baseSize * 1.5, baseSize * 1.8, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.4 : 0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ポイントライトはホバー時のみ表示（常時30個→必要時のみ）*/}
      {hovered && <pointLight color={color} intensity={1.5} distance={6} />}

      {/* ツールチップ */}
      {hovered && (
        <Html center position={[0, baseSize * 2.5, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(10, 10, 30, 0.85)', padding: '8px 14px',
            borderRadius: '8px', border: `1px solid ${color}80`,
            backdropFilter: 'blur(8px)', color: '#fff',
            whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column',
            alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            <span style={{ fontWeight: 700, fontSize: '13px' }}>{repo.name}</span>
            <span style={{ fontSize: '11px', color: '#f7df1e', marginTop: '2px' }}>
              ★ {repo.stargazers_count.toLocaleString()}
            </span>
          </div>
        </Html>
      )}
    </animated.group>
  );
};
