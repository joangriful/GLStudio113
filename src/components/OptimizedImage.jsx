import { useState, useRef, useEffect } from 'react'
import { useImageFormats, generateImageSources } from '../hooks/useImageFormats'

// Función helper para normalizar las rutas de imágenes con el base URL de Vite
function normalizeImagePath(path) {
  if (!path) return ''
  if (path.startsWith('/')) return path
  if (path.startsWith('./') || path.startsWith('../')) return path
  const baseUrl = import.meta.env.BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return `${cleanBase}${cleanPath}`
}

export default function OptimizedImage({ src, alt, className = '', loading = 'lazy', ...props }) {
  const { generateImageSources } = useImageFormats()
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  const sources = generateImageSources(src)
  const normalizedOriginal = normalizeImagePath(sources.original)
  const normalizedWebp = normalizeImagePath(sources.webp)
  const normalizedAvif = normalizeImagePath(sources.avif)
  const normalizedThumb = normalizeImagePath(sources.thumb)

  useEffect(() => {
    // Verificar si la imagen ya está cargada (útil para imágenes en caché)
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [src])

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
          ref={imgRef}
          src={normalizedOriginal}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          className={`main-image ${isLoaded ? 'visible' : ''}`}
          style={{ opacity: isLoaded ? 1 : 0 }}
          {...props}
        />
      </picture>
    </div>
  )
}

