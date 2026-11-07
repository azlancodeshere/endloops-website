import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Keep the vendor runtime in its own chunk so app changes don't
        // invalidate React for returning visitors. (rolldown wants a function.)
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
