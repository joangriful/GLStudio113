import { useEffect } from 'react'
import { useModal } from '../hooks/useModal'
import { galleryData } from '../data/images'
import GalleryBox from '../components/GalleryBox'
import Modal from '../components/Modal'
import './Concerts.css'

export default function Concerts() {
  const { isOpen, currentImage, currentIndex, totalImages, openModal, closeModal, navigateImage } = useModal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const concerts = galleryData.concerts || []

  return (
    <div className="page-container">
      <section className="section-page">
        <div className="section-header">
          <h1 className="section-page-title">Conciertos</h1>
          <p className="section-page-description">
            Capturando la energía y emoción de los escenarios
          </p>
        </div>
        <div className="galleries-container">
          {concerts.map((gallery, index) => (
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



