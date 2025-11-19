import { useState, useRef, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'
import './GalleryBox.css'

export default function GalleryBox({ gallery, onImageClick }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandedRef = useRef(null)

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
      <div className="gallery-box-header" onClick={toggleExpand}>
        <h2 className="gallery-box-title">{gallery.title}</h2>
        <button className="gallery-box-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div className="gallery-preview">
        {previewImages.map((imgSrc, i) => (
          <div 
            key={i}
            className="preview-item"
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
          </div>
        ))}
      </div>

      {isExpanded && (
        <div className="gallery-expanded" ref={expandedRef}>
          <div className="expanded-gallery-grid">
            {imagesToShow.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="expanded-item"
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
                <div className="expanded-item-title">{image.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

