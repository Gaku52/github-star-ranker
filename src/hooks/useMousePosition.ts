import { useRef, useEffect } from 'react';

// ref を使うことで mousemove のたびに React 再レンダリングが発生しなくなる
export function useMousePosition() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      mousePosition.current.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(ev.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition.current;
}
