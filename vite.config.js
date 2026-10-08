import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only apply base path in production (GitHub Pages), not during local dev
  base: process.env.NODE_ENV === 'production' ? '/veltech-career-archive-bca2nd/' : '/',
})
