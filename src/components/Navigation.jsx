import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import './Navigation.css'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const handleNavClick = (section) => {
    setIsOpen(false)
    
    if (section === 'home') {
      navigate('/')
    } else if (section === 'collections') {
      navigate('/collections')
    } else if (section === 'concerts') {
      navigate('/concerts')
    } else if (section === 'fashion-events') {
      navigate('/fashion-events')
    } else if (section === 'about') {
      if (location.pathname === '/') {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        navigate('/#about')
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      const nav = document.getElementById('floatingNav')
      const toggle = document.getElementById('menuToggle')
      if (isOpen && nav && !nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <>
      <button 
        className={`menu-toggle ${isOpen ? 'active' : ''}`}
        id="menuToggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="menu-icon">
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </span>
      </button>

      <nav className={`floating-nav ${isOpen ? 'active' : ''}`} id="floatingNav">
        <div className="nav-item" onClick={() => handleNavClick('home')}>
          <span className="nav-number">01</span>
          <span className="nav-label">Inicio</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('fashion-events')}>
          <span className="nav-number">02</span>
          <span className="nav-label">Eventos de Moda</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('collections')}>
          <span className="nav-number">03</span>
          <span className="nav-label">Colecciones</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('concerts')}>
          <span className="nav-number">04</span>
          <span className="nav-label">Conciertos</span>
        </div>
        <div className="nav-item" onClick={() => handleNavClick('about')}>
          <span className="nav-number">05</span>
          <span className="nav-label">About Me</span>
        </div>
        <button 
          className="nav-item theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <span className="nav-number">06</span>
          <span className="nav-label">{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
          <svg className="theme-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </nav>
    </>
  )
}

