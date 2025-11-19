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

