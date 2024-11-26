import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/SEAM/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Ensure assets are handled correctly
        assetFileNames: (assetInfo) => {
          return `assets/${assetInfo.name}`;
        }
      }
    }
  }
}))