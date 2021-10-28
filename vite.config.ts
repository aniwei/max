import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeJSRuntimePlugin } from './plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), NodeJSRuntimePlugin()]
})
