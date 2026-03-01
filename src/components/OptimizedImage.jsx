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

export default function OptimizedImage({ src, alt, className = '', loading = 'lazy', ...props }) {
  const { generateImageSources } = useImageFormats()
  const [isLoaded, setIsLoaded] = useState(false)

  const sources = generateImageSources(src)
  const normalizedOriginal = normalizeImagePath(sources.original)
  const normalizedWebp = normalizeImagePath(sources.webp)
  const normalizedAvif = normalizeImagePath(sources.avif)
  const normalizedThumb = normalizeImagePath(sources.thumb)

  return (
    <div className={`optimized-image-container ${className} ${isLoaded ? 'loaded' : 'loading'}`}>
      {/* Miniatura de fondo para el blur-up */}
      <img
        src={normalizedThumb}
        alt=""
        className="image-thumbnail"
        aria-hidden="true"
      />

      <picture>
        <source srcSet={normalizedAvif} type="image/avif" />
        <source srcSet={normalizedWebp} type="image/webp" />
        <img
          src={normalizedOriginal}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          className={`main-image ${isLoaded ? 'visible' : 'hidden'}`}
          {...props}
        />
      </picture>
    </div>
  )
}

