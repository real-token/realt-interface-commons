import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    NgmiPolyfill()
  ],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: 'globalThis',
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  },
})
