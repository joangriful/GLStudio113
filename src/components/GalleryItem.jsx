import OptimizedImage from './OptimizedImage'
import './GalleryItem.css'

export default function GalleryItem({ image, onClick, isMainGallery = false }) {
  return (
    <div 
      className={isMainGallery ? 'gallery-item' : 'photo-item'}
      data-category={image.category?.toLowerCase()}
      onClick={() => onClick(image)}
    >
      <OptimizedImage
        src={image.src}
        alt={image.title}
        loading="lazy"
        className="gallery-item-image"
      />
      {isMainGallery && (
        <div className="gallery-item-info">
          <div className="gallery-item-title">{image.title}</div>
          <div className="gallery-item-category">{image.category}</div>
        </div>
      )}
    </div>
  )
}

