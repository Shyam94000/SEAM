import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/SEAM/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('models')) {
            return 'models';
          }
        }
      }
    }
  },
  plugins: [react()],
}))