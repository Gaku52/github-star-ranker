import * as THREE from 'three';

export function calculateStarPosition(index: number, total: number): THREE.Vector3 {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const radius = 2 + index * 0.4;
  const theta = index * goldenAngle;
  const y = (index / total - 0.5) * 8;

  return new THREE.Vector3(
    Math.cos(theta) * radius,
    y + Math.sin(index * 0.5) * 0.5,
    Math.sin(theta) * radius
  );
}
