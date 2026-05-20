import OptimizedImage from './OptimizedImage'
import './GalleryItem.css'

export default function GalleryItem({ image, onClick, isMainGallery = false }) {
  return (
    <button
      type="button"
      className={isMainGallery ? 'gallery-item' : 'photo-item'}
      data-category={image.category?.toLowerCase()}
      aria-label={`Ver ${image.title}${image.category ? ` de ${image.category}` : ''}`}
      onClick={() => onClick(image)}
    >
      <OptimizedImage
        src={image.src}
        alt={image.title}
        loading="lazy"
        className="gallery-item-image"
      />
      {isMainGallery && (
        <span className="gallery-item-info">
          <span className="gallery-item-title">{image.title}</span>
          <span className="gallery-item-category">{image.category}</span>
        </span>
      )}
    </button>
  )
}

