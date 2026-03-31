import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@dnd-kit/core': fileURLToPath(
        new URL('./src/libs/dnd-kit/index.ts', import.meta.url)
      ),
      '@dnd-kit/utilities': fileURLToPath(
        new URL('./src/libs/dnd-kit/utilities.ts', import.meta.url)
      ),
    },
  },
});
