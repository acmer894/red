import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    open: true,
  },
  // 设置基本公共路径，用于GitHub Pages部署
  base: '/red/',
})
