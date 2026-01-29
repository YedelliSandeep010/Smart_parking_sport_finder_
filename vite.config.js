import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // This forces Vite to use 5174
    strictPort: true // This prevents Vite from jumping to 5175 if 5174 is busy
  }
})
