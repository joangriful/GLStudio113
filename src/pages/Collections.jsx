import { useEffect } from 'react'
import { useModal } from '../hooks/useModal'
import { galleryData } from '../data/images'
import GalleryBox from '../components/GalleryBox'
import Modal from '../components/Modal'
import './Collections.css'

export default function Collections() {
  const { isOpen, currentImage, currentIndex, totalImages, openModal, closeModal, navigateImage } = useModal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const collections = galleryData.collections || []

  return (
    <div className="page-container">
      <section className="section-page">
        <div className="section-header">
          <h1 className="section-page-title">Colecciones</h1>
          <p className="section-page-description">
            Exploración visual de colecciones de moda y diseño
          </p>
        </div>
        <div className="galleries-container">
          {collections.map((gallery, index) => (
            <GalleryBox
              key={`${gallery.title}-${index}`}
              gallery={gallery}
              onImageClick={openModal}
            />
          ))}
        </div>
      </section>
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



