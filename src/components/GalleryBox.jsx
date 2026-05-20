import { useState, useRef, useEffect, useId } from 'react'
import OptimizedImage from './OptimizedImage'
import './GalleryBox.css'

export default function GalleryBox({ gallery, onImageClick }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandedRef = useRef(null)
  const galleryId = useId()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (isExpanded && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [isExpanded])

  const previewImages = gallery.preview.slice(0, 3)
  const imagesToShow = gallery.images.slice(0, 15)

  return (
    <div className={`gallery-box ${isExpanded ? 'expanded' : ''}`}>
      <button
        className="gallery-box-header"
        onClick={toggleExpand}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`${galleryId}-content`}
      >
        <span className="gallery-box-title" role="heading" aria-level="2">{gallery.title}</span>
        <span className="gallery-box-toggle" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      <div className="gallery-preview">
        {previewImages.map((imgSrc, i) => (
          <button
            type="button"
            key={i}
            className="preview-item"
            aria-label={`Ver imagen ${i + 1} de ${gallery.title}`}
            onClick={(e) => {
              e.stopPropagation()
              const image = gallery.images.find(img => img.src === imgSrc) || gallery.images[0]
              if (onImageClick) onImageClick(image, gallery.images)
            }}
          >
            <OptimizedImage
              src={imgSrc}
              alt={`${gallery.title} - Preview ${i + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {isExpanded && (
        <div className="gallery-expanded" id={`${galleryId}-content`} ref={expandedRef}>
          <div className="expanded-gallery-grid">
            {imagesToShow.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                className="expanded-item"
                type="button"
                aria-label={`Ver ${image.title}, imagen ${index + 1} de ${gallery.title}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (onImageClick) onImageClick(image, gallery.images)
                }}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                />
                <span className="expanded-item-title">{image.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

