import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/github-star-ranker/',
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'postprocessing': ['@react-three/postprocessing'],
          'react-spring': ['@react-spring/three'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
});
