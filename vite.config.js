import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Expose SHEETS_-prefixed env vars (e.g. SHEETS_ENDPOINT) to client code via
  // import.meta.env, alongside Vite's default VITE_ prefix.
  envPrefix: ['VITE_', 'SHEETS_'],
})
