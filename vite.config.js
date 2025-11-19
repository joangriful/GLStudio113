import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Obtener el nombre del repositorio desde la variable de entorno o usar el valor por defecto
// Para GitHub Pages, si tu repositorio es "usuario/GLStudio113", el base debe ser "/GLStudio113/"
// Puedes cambiar esto creando un archivo .env.production con: VITE_REPO_NAME=tu-nombre-repo
const repoName = process.env.VITE_REPO_NAME || 'GLStudio113'
const base = process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Copiar imágenes durante el build
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('images')) {
            return 'images/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})

