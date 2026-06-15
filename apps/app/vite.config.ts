import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@tasksetu/core': r('../../packages/core/src/index.ts'),
      '@tasksetu/ui/styles.css': r('../../packages/ui/src/styles.css'),
      '@tasksetu/ui': r('../../packages/ui/src/index.ts'),
      '@': r('./src'),
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: 'dist',
  },
});
