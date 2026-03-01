import { useEffect, useState } from 'react'
import { useImageFormats } from '../hooks/useImageFormats'
import './Modal.css'

export default function Modal({ isOpen, currentImage, currentIndex, totalImages, onClose, onNavigate }) {
  const { generateImageSources } = useImageFormats()
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Reset isLoaded when image changes
  useEffect(() => {
    setIsLoaded(false)
  }, [currentImage])

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

  if (!isOpen || !currentImage) return null

  const sources = generateImageSources(currentImage.src)
  const normalizedOriginal = normalizeImagePath(sources.original)
  const normalizedWebp = normalizeImagePath(sources.webp)
  const normalizedAvif = normalizeImagePath(sources.avif)
  const normalizedThumb = normalizeImagePath(sources.thumb)

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>

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
              className={`modal-image ${isLoaded ? 'visible' : 'hidden'}`}
              src={normalizedOriginal}
              alt={currentImage.title || 'Imagen ampliada'}
              onLoad={() => setIsLoaded(true)}
            />
          </picture>
        </div>

        <div className="modal-info">
          <h3 className="modal-title">{currentImage.title}</h3>
          <p className="modal-category">{currentImage.category}</p>
        </div>
      </div>
    </div>
  )
}

// Helper function duplicate (or import it if moved to utils)
function normalizeImagePath(path) {
  if (path.startsWith('/')) return path
  if (path.startsWith('./') || path.startsWith('../')) return path
  const baseUrl = import.meta.env.BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return `${cleanBase}${cleanPath}`
}

