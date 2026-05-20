import { useEffect, useState, useRef } from 'react'
import { useImageFormats } from '../hooks/useImageFormats'
import './Modal.css'

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

export default function Modal({ isOpen, currentImage, currentIndex, totalImages, onClose, onNavigate }) {
  const { generateImageSources } = useImageFormats()
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)
  const contentRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Reset isLoaded cuando cambia la imagen
  useEffect(() => {
    setIsLoaded(false)
    // Verificar si la nueva imagen ya está en caché
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [currentImage])

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement
    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      cancelAnimationFrame(focusFrame)
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.changedTouches[0].screenX,
      y: e.changedTouches[0].screenY
    })
  }

  const handleTouchEnd = (e) => {
    const touchEnd = {
      x: e.changedTouches[0].screenX,
      y: e.changedTouches[0].screenY
    }
    const swipeDistance = touchEnd.x - touchStart.x
    const verticalDistance = Math.abs(touchEnd.y - touchStart.y)
    const horizontalDistance = Math.abs(swipeDistance)

    if (horizontalDistance > 50 && horizontalDistance > verticalDistance) {
      if (swipeDistance > 0) {
        onNavigate(-1)
      } else {
        onNavigate(1)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab' || !contentRef.current) return

    const focusableElements = Array.from(
      contentRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    )

    if (focusableElements.length === 0) {
      e.preventDefault()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }

  if (!isOpen || !currentImage) return null

  const sources = generateImageSources(currentImage.src)
  const normalizedOriginal = normalizeImagePath(sources.original)
  const normalizedWebp = normalizeImagePath(sources.webp)
  const normalizedAvif = normalizeImagePath(sources.avif)
  const normalizedThumb = normalizeImagePath(sources.thumb)

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="modal-content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
          aria-label="Cerrar imagen ampliada"
          ref={closeButtonRef}
        >
          &times;
        </button>

        {totalImages > 1 && (
          <>
            <button
              className="modal-nav-prev"
              onClick={() => onNavigate(-1)}
              aria-label="Imagen anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="modal-nav-next"
              onClick={() => onNavigate(1)}
              aria-label="Imagen siguiente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <div className="modal-counter">
              {currentIndex + 1} / {totalImages}
            </div>
          </>
        )}

        <div className={`modal-image-container ${isLoaded ? 'loaded' : 'loading'}`}>
          <img
            src={normalizedThumb}
            alt=""
            className="modal-image-thumbnail"
            aria-hidden="true"
          />
          <picture>
            <source srcSet={normalizedAvif} type="image/avif" />
            <source srcSet={normalizedWebp} type="image/webp" />
            <img
              ref={imgRef}
              className={`modal-image ${isLoaded ? 'visible' : ''}`}
              style={{ opacity: isLoaded ? 1 : 0 }}
              src={normalizedOriginal}
              alt={currentImage.title || 'Imagen ampliada'}
              onLoad={() => setIsLoaded(true)}
            />
          </picture>
        </div>

        <div className="modal-info">
          <h3 className="modal-title" id="modal-title">{currentImage.title}</h3>
          <p className="modal-category">{currentImage.category}</p>
        </div>
      </div>
    </div>
  )
}

