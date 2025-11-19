import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import About from '../components/About'
import './Home.css'

export default function Home() {
  useEffect(() => {
    // Scroll suave al inicio al cargar
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <a
        href="https://www.instagram.com/glstudio113/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-button"
        aria-label="Síguenos en Instagram"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <Hero />
      <section className="main-gallery">
        <div className="gallery-header">
          <h2 className="section-title">
            <span className="title-underline">Galería</span>
            <span className="title-accent">Principal</span>
          </h2>
        </div>
        <Gallery limit={12} />
        <div className="sections-nav-container">
          <div className="sections-nav-grid">
            <Link to="/fashion-events" className="section-nav-card" data-section="fashion">
              <div className="section-nav-content">
                <h3 className="section-nav-name">Eventos de Moda</h3>
              </div>
            </Link>
            <Link to="/collections" className="section-nav-card" data-section="collections">
              <div className="section-nav-content">
                <h3 className="section-nav-name">Colecciones</h3>
              </div>
            </Link>
            <Link to="/concerts" className="section-nav-card" data-section="concerts">
              <div className="section-nav-content">
                <h3 className="section-nav-name">Conciertos</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <About />
    </>
  )
}

