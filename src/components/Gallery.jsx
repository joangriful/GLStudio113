import { useNavigate } from 'react-router-dom'
import GalleryItem from './GalleryItem'
import { imageData } from '../data/images'
import './Gallery.css'

export default function Gallery({ category, onImageClick, limit = 12 }) {
  const navigate = useNavigate()
  
  const handleImageClick = (image) => {
    if (onImageClick) {
      onImageClick(image)
    } else {
      // Redirigir a la página correspondiente
      const categoryLower = image.category?.toLowerCase() || ''
      if (categoryLower.includes('eventos de moda') || categoryLower.includes('fashion')) {
        navigate('/fashion-events')
      } else if (categoryLower.includes('colecciones') || categoryLower.includes('collections')) {
        navigate('/collections')
      } else if (categoryLower.includes('conciertos') || categoryLower.includes('concerts')) {
        navigate('/concerts')
      }
    }
  }

  let images = []
  
  if (category) {
    images = imageData[category] || []
  } else {
    // Mezclar todas las imágenes
    const allImages = Object.values(imageData).flat()
    images = allImages.sort(() => Math.random() - 0.5).slice(0, limit)
  }

  return (
    <div className="gallery-grid" id="mainGallery">
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

