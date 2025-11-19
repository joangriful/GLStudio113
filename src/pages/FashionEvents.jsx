import { useEffect } from 'react'
import { useModal } from '../hooks/useModal'
import { galleryData } from '../data/images'
import GalleryBox from '../components/GalleryBox'
import Modal from '../components/Modal'
import './FashionEvents.css'

export default function FashionEvents() {
  const { isOpen, currentImage, currentIndex, totalImages, openModal, closeModal, navigateImage } = useModal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fashionEvents = galleryData['fashion-events'] || []

  return (
    <div className="page-container">
      <section className="section-page">
        <div className="section-header">
          <h1 className="section-page-title">Eventos de Moda</h1>
          <p className="section-page-description">
            Documentando la elegancia y creatividad de la moda
          </p>
        </div>
        <div className="galleries-container">
          {fashionEvents.map((gallery, index) => (
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


