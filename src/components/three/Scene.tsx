import React, { useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Repository } from '../../types/github';
import { LANGUAGE_COLORS } from '../../utils/colors';
import { calculateStarPosition } from '../../utils/starLayout';
import { StarField } from './StarField';
import { LandingTitle } from './LandingTitle';
import { RepoStar } from './RepoStar';
import { CameraController } from './CameraController';

interface Props {
  mode: 'landing' | 'explore' | 'detail';
  activeLanguage: string | null;
  repositories: Repository[] | undefined;
  activeRepo: Repository | null;
  onStarClick: (repo: Repository, position: THREE.Vector3) => void;
}

export const Scene: React.FC<Props> = ({ mode, activeLanguage, repositories, activeRepo, onStarClick }) => {
  const color = activeLanguage ? LANGUAGE_COLORS[activeLanguage] : '#ffffff';

  const starData = useMemo(() => {
    if (!repositories) return [];
    return repositories.map((repo, index) => ({
      repo,
      position: calculateStarPosition(index, repositories.length),
      rank: index + 1
    }));
  }, [repositories]);

  const targetPosition = useMemo(() => {
    if (!activeRepo) return null;
    const found = starData.find(s => s.repo.id === activeRepo.id);
    return found ? found.position : null;
  }, [activeRepo, starData]);

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 45 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#05050a']} />
      <ambientLight intensity={0.05} />

      <Suspense fallback={null}>
        <StarField activeLanguage={activeLanguage} />
        <CameraController targetPosition={targetPosition} mode={mode} />

        {mode === 'landing' && <LandingTitle />}

        {mode !== 'landing' && starData.map((data, index) => (
          <RepoStar
            key={data.repo.id}
            repo={data.repo}
            position={data.position}
            color={color}
            rank={data.rank}
            delayIndex={index}
            isActive={!activeRepo || activeRepo.id === data.repo.id}
            onClick={onStarClick}
          />
        ))}

        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette offset={0.25} darkness={0.75} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};
