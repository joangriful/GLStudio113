import { useState, useEffect } from 'react'
import { useImageFormats, generateImageSources } from '../hooks/useImageFormats'

export default function OptimizedImage({ src, alt, className = '', loading = 'lazy', onError, ...props }) {
  const { getBestFormat, formats } = useImageFormats()
  const [imageSrc, setImageSrc] = useState(src)
  const [errorAttempts, setErrorAttempts] = useState(0)

  useEffect(() => {
    if (formats.webp !== null || formats.avif !== null) {
      const bestSrc = getBestFormat(src)
      setImageSrc(bestSrc)
    } else {
      setImageSrc(src)
    }
  }, [src, formats, getBestFormat])

  const handleError = () => {
    const sources = generateImageSources(src)
    
    if (errorAttempts === 0 && formats.avif) {
      setImageSrc(sources.webp)
      setErrorAttempts(1)
    } else if (errorAttempts === 1 && formats.webp) {
      setImageSrc(sources.original)
      setErrorAttempts(2)
    } else {
      // Intentar diferentes extensiones
      const baseName = src.replace(/\.(jpg|jpeg|png|webp|avif|JPG|JPEG|PNG|WEBP|AVIF)$/i, '')
      const extensions = ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png']
      const currentExt = src.match(/\.([^.]+)$/)?.[0] || ''
      
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

