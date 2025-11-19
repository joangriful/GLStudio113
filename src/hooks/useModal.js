import { useState, useEffect } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [gallery, setGallery] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (image, galleryImages = []) => {
    if (galleryImages.length > 0) {
      setGallery(galleryImages)
      const index = galleryImages.findIndex(img => img.src === image.src)
      setCurrentIndex(index >= 0 ? index : 0)
    } else {
      setGallery([image])
      setCurrentIndex(0)
    }
    setCurrentImage(image)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
    setTimeout(() => {
      setCurrentImage(null)
      setGallery([])
      setCurrentIndex(0)
    }, 300)
  }

  const navigateImage = (direction) => {
    if (gallery.length <= 1) return
    
    const newIndex = (currentIndex + direction + gallery.length) % gallery.length
    setCurrentIndex(newIndex)
    setCurrentImage(gallery[newIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1)
      } else if (e.key === 'ArrowRight') {
        navigateImage(1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, gallery.length])

  return {
    isOpen,
    currentImage: currentImage || gallery[currentIndex],
    currentIndex,
    totalImages: gallery.length,
    openModal,
    closeModal,
    navigateImage
  }
}

