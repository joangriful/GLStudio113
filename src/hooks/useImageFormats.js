import { useState, useEffect } from 'react'

let formatSupport = {
  webp: null,
  avif: null
}

function detectWebPSupport() {
  if (formatSupport.webp !== null) return formatSupport.webp
  
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  formatSupport.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  return formatSupport.webp
}

function detectAVIFSupport() {
  if (formatSupport.avif !== null) return Promise.resolve(formatSupport.avif)
  
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      formatSupport.avif = true
      resolve(true)
    }
    img.onerror = () => {
      formatSupport.avif = false
      resolve(false)
    }
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
  })
}

function getBaseName(path) {
  return path.replace(/\.(jpg|jpeg|png|webp|avif|JPG|JPEG|PNG|WEBP|AVIF)$/i, '')
}

export function generateImageSources(originalPath) {
  const baseName = getBaseName(originalPath)
  return {
    original: originalPath,
    webp: `${baseName}.webp`,
    avif: `${baseName}.avif`
  }
}

export function useImageFormats() {
  const [formats, setFormats] = useState({ webp: false, avif: false })
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    let mounted = true
    
    Promise.all([
      Promise.resolve(detectWebPSupport()),
      detectAVIFSupport()
    ]).then(([webp, avif]) => {
      if (mounted) {
        setFormats({ webp, avif })
        setIsDetecting(false)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const getBestFormat = (originalPath) => {
    const sources = generateImageSources(originalPath)
    if (formats.avif) return sources.avif
    if (formats.webp) return sources.webp
    return sources.original
  }

  return { formats, isDetecting, getBestFormat, generateImageSources }
}

