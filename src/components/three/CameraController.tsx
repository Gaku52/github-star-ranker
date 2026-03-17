import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

interface Props {
  targetPosition: THREE.Vector3 | null;
  mode: 'landing' | 'explore' | 'detail';
}

export const CameraController: React.FC<Props> = ({ targetPosition, mode }) => {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const currentPos = useRef(new THREE.Vector3(0, 0, 20));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (mode === 'landing') {
      currentPos.current.set(0, 0, 20);
    } else if (mode === 'explore') {
      currentPos.current.set(0, 0, 25);
    }
  }, [mode]);

  // useFrame 内での毎フレーム Vector3 アロケーションを防ぐため ref でキャッシュ
  const detailOffset = useRef(new THREE.Vector3(3, 1, 5));
  const idealPos = useRef(new THREE.Vector3());
  const origin = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (targetPosition && mode === 'detail') {
      idealPos.current.copy(targetPosition).add(detailOffset.current);
      currentPos.current.lerp(idealPos.current, 0.03);
      currentLookAt.current.lerp(targetPosition, 0.03);
    } else {
      const parallaxX = mouse.x * 1.5;
      const parallaxY = mouse.y * 1.5;
      const baseZ = mode === 'landing' ? 20 : 25;

      idealPos.current.set(parallaxX, parallaxY, baseZ);
      currentPos.current.lerp(idealPos.current, 0.03);
      currentLookAt.current.lerp(origin.current, 0.03);
    }

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
