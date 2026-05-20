import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import OptimizedImage from '../components/OptimizedImage'
import Modal from '../components/Modal'
import { galleryData } from '../data/images'
import { useModal } from '../hooks/useModal'
import './AllGallery.css'

const layoutPattern = [
  'feature',
  'portrait',
  'standard',
  'wide',
  'tall',
  'standard',
  'portrait',
  'feature-vertical',
  'standard',
  'wide',
  'tall',
  'standard'
]

function shuffleImages(images) {
  return [...images].sort(() => Math.random() - 0.5)
}

function getAllImages() {
  const allImages = Object.values(galleryData).flatMap((galleries) =>
    galleries.flatMap((gallery) => gallery.images)
  )

  return Array.from(new Map(allImages.map((image) => [image.src, image])).values())
}

export default function AllGallery() {
  const { isOpen, currentImage, currentIndex, totalImages, openModal, closeModal, navigateImage } = useModal()
  const images = useMemo(() => shuffleImages(getAllImages()), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="all-gallery-page">
      <header className="all-gallery-hero">
        <Link className="all-gallery-back" to="/">
          Volver
        </Link>
        <div className="all-gallery-heading">
          <p className="all-gallery-kicker">{images.length} imágenes</p>
          <h1 className="all-gallery-title">Galería completa</h1>
        </div>
      </header>

      <main className="all-gallery-mosaic" aria-label="Galería completa">
        {images.map((image, index) => {
          const layoutClass = layoutPattern[index % layoutPattern.length]

          return (
            <button
              className={`all-gallery-item all-gallery-item--${layoutClass}`}
              key={`${image.src}-${index}`}
              type="button"
              aria-label={`Ver ${image.title}, ${image.category}`}
              onClick={() => openModal(image, images)}
            >
              <OptimizedImage
                src={image.src}
                alt={image.title}
                loading={index < 8 ? 'eager' : 'lazy'}
                className="all-gallery-image"
              />
              <span className="all-gallery-caption">
                <span className="all-gallery-caption-title">{image.title}</span>
                <span className="all-gallery-caption-category">{image.category}</span>
              </span>
            </button>
          )
        })}
      </main>

      <Modal
        isOpen={isOpen}
        currentImage={currentImage}
        currentIndex={currentIndex}
        totalImages={totalImages}
        onClose={closeModal}
        onNavigate={navigateImage}
      />
    </div>
  )
}
