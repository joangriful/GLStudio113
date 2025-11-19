import { useEffect, useState } from 'react'
import Threads from './Thread'
import { useTheme } from '../hooks/useTheme'
import './Hero.css'

export default function Hero() {
  const { theme } = useTheme()
  const [threadColor, setThreadColor] = useState([0, 0, 0])

  useEffect(() => {
    // Ajustar color según el tema
    if (theme === 'dark') {
      setThreadColor([1, 1, 1]) // Blanco para tema oscuro
    } else {
      setThreadColor([0, 0, 0]) // Negro para tema claro
    }
  }, [theme])

  return (
    <section className="hero" id="home">
      <div className="hero-threads-wrapper">
        <Threads
          color={threadColor}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">GLStudio</span>
          <span className="title-line">113</span>
        </h1>
        <p className="hero-subtitle">Joan Griful Lara</p>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}

