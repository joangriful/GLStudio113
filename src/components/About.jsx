import { useState, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'
import './About.css'

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const aboutImages = [
    { src: 'images/about/P1100644.JPG', alt: 'Joan Griful Lara' },
    { src: 'images/about/P1100645.JPG', alt: 'Joan Griful Lara' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutImages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [aboutImages.length])

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-intro-area">
            <div className="about-name-section">
              <h3 className="about-name">Joan Griful Lara</h3>
              <p className="about-role">Fotógrafo Profesional</p>
            </div>
            <div className="about-image-carousel">
              <div className="carousel-container">
                {aboutImages.map((img, index) => (
                  <div
                    key={index}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  >
                    <OptimizedImage
                      src={img.src}
                      alt={img.alt}
                      className="about-image"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-main-content">
            <div className="about-description">
              <p>
                Apasionado por capturar momentos únicos a través de la lente. Especializado en eventos de moda, 
                colecciones de prendas y conciertos, busco transmitir la esencia y emoción de cada instante.
              </p>
              <p>
                Mi trabajo combina técnica, creatividad y sensibilidad artística para crear imágenes que cuentan 
                historias y evocan emociones.
              </p>
            </div>

            <div className="about-bottom-section">
              <div className="about-specialties">
                <h4 className="specialties-title">Especialidades</h4>
                <div className="specialties-grid">
                  <div className="specialty-item">
                    <div className="specialty-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 7h-4M4 7h4m0 0v10m0-10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2m0 0v10m0 0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"></path>
                      </svg>
                    </div>
                    <div className="specialty-name">Moda</div>
                  </div>
                  <div className="specialty-item">
                    <div className="specialty-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="specialty-name">Colecciones</div>
                  </div>
                  <div className="specialty-item">
                    <div className="specialty-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    </div>
                    <div className="specialty-name">Conciertos</div>
                  </div>
                  <div className="specialty-item">
                    <div className="specialty-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                    <div className="specialty-name">Retratos</div>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a
                  href="https://www.instagram.com/glstudio113/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-social="instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-social="twitter"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-social="linkedin"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-social="behance"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 7h-7v-2c0-1.1.9-2 2-2h5v4z"></path>
                    <path d="M15 7v4h7c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-2.21 1.79-4 4-4h4v4z"></path>
                    <path d="M9 5H2v14h7c3.31 0 6-2.69 6-6s-2.69-6-6-6z"></path>
                  </svg>
                  <span>Behance</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


