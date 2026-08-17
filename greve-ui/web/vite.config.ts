import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NUI is served from a local path inside the game's CEF browser, so all
// asset URLs must be relative rather than absolute.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
