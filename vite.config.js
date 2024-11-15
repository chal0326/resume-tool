import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nextui from '@nextui-org/vite'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nextui(), eslint()],
})
