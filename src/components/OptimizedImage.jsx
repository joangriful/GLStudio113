import { useState, useEffect } from 'react'
import { useImageFormats, generateImageSources } from '../hooks/useImageFormats'

// Función helper para normalizar las rutas de imágenes con el base URL de Vite
function normalizeImagePath(path) {
  // Si la ruta ya empieza con /, está bien (absoluta desde el dominio)
  if (path.startsWith('/')) {
    return path
  }
  // Si empieza con ./ o ../, mantenerla relativa
  if (path.startsWith('./') || path.startsWith('../')) {
    return path
  }
  // Para rutas en public/, usar el base URL de Vite
  // import.meta.env.BASE_URL ya incluye el base path (ej: "/GLStudio113/")
  const baseUrl = import.meta.env.BASE_URL
  // Asegurarse de que la ruta no tenga / al inicio y el baseUrl termine con /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return `${cleanBase}${cleanPath}`
}

export default function OptimizedImage({ src, alt, className = '', loading = 'lazy', onError, ...props }) {
  const { getBestFormat, formats } = useImageFormats()
  const [imageSrc, setImageSrc] = useState(normalizeImagePath(src))
  const [errorAttempts, setErrorAttempts] = useState(0)

  useEffect(() => {
    const normalizedSrc = normalizeImagePath(src)
    if (formats.webp !== null || formats.avif !== null) {
      const bestSrc = getBestFormat(normalizedSrc)
      setImageSrc(bestSrc)
    } else {
      setImageSrc(normalizedSrc)
    }
  }, [src, formats, getBestFormat])

  const handleError = () => {
    const normalizedSrc = normalizeImagePath(src)
    const sources = generateImageSources(normalizedSrc)
    
    if (errorAttempts === 0 && formats.avif) {
      setImageSrc(sources.webp)
      setErrorAttempts(1)
    } else if (errorAttempts === 1 && formats.webp) {
      setImageSrc(sources.original)
      setErrorAttempts(2)
    } else {
      // Intentar diferentes extensiones
      const baseName = normalizedSrc.replace(/\.(jpg|jpeg|png|webp|avif|JPG|JPEG|PNG|WEBP|AVIF)$/i, '')
      const extensions = ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png']
      const currentExt = normalizedSrc.match(/\.([^.]+)$/)?.[0] || ''
      
      for (let ext of extensions) {
        if (ext.toLowerCase() !== currentExt.toLowerCase()) {
          setImageSrc(baseName + ext)
          break
        }
      }
      
      if (onError) {
        onError()
      }
    }
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      {...props}
    />
  )
}

