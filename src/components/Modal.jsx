import { useEffect, useState } from 'react'
import { useImageFormats } from '../hooks/useImageFormats'
import './Modal.css'

export default function Modal({ isOpen, currentImage, currentIndex, totalImages, onClose, onNavigate }) {
  const { getBestFormat, generateImageSources } = useImageFormats()
  const [imageSrc, setImageSrc] = useState('')
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (currentImage) {
      const sources = generateImageSources(currentImage.src)
      const bestSrc = getBestFormat(currentImage.src)
      setImageSrc(bestSrc)
    }
  }, [currentImage, getBestFormat, generateImageSources])

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

        <img 
          className="modal-image" 
          src={imageSrc || currentImage.src} 
          alt={currentImage.title || 'Imagen ampliada'}
          onError={() => {
            const sources = generateImageSources(currentImage.src)
            setImageSrc(sources.original)
          }}
        />
        <div className="modal-info">
          <h3 className="modal-title">{currentImage.title}</h3>
          <p className="modal-category">{currentImage.category}</p>
        </div>
      </div>
    </div>
  )
}

