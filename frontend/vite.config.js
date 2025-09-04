import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url' // Importar as funções necessárias

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // A forma correta de definir o alias em ES Modules
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})