import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import GalleryItem from './GalleryItem'
import { imageData } from '../data/images'
import './Gallery.css'

export default function Gallery({ category, images: customImages, onImageClick, limit = 12, gridId = 'mainGallery' }) {
  const navigate = useNavigate()
  const images = useMemo(() => {
    if (customImages) return customImages

    if (category) {
      return imageData[category] || []
    }

    const allImages = Object.values(imageData).flat()
    return [...allImages].sort(() => Math.random() - 0.5).slice(0, limit)
  }, [category, customImages, limit])

  const handleImageClick = (image) => {
    if (onImageClick) {
      onImageClick(image, images)
      return
    }

    const categoryLower = image.category?.toLowerCase() || ''
    if (categoryLower.includes('eventos de moda') || categoryLower.includes('fashion')) {
      navigate('/fashion-events')
    } else if (categoryLower.includes('colecciones') || categoryLower.includes('collections')) {
      navigate('/collections')
    } else if (categoryLower.includes('conciertos') || categoryLower.includes('concerts')) {
      navigate('/concerts')
    }
  }

  return (
    <div className="gallery-grid" id={gridId}>
      {images.map((image, index) => (
        <GalleryItem
          key={`${image.src}-${index}`}
          image={image}
          onClick={handleImageClick}
          isMainGallery={!category || category === 'main'}
        />
      ))}
    </div>
  )
}
