import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const followerPosition = useRef({ x: 0, y: 0 })
  const animationFrame = useRef(null)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(any-pointer: fine)')
    const hoverQuery = window.matchMedia('(any-hover: hover)')
    const touchOnlyQuery = window.matchMedia('(pointer: coarse) and (hover: none)')
    const mobileViewportQuery = window.matchMedia('(max-width: 768px)')

    const updateEnabled = () => {
      setIsEnabled(
        !mobileViewportQuery.matches &&
        (finePointerQuery.matches || hoverQuery.matches || !touchOnlyQuery.matches)
      )
    }

    const enableOnMouse = (e) => {
      if (!mobileViewportQuery.matches && (!e.pointerType || e.pointerType === 'mouse')) {
        setIsEnabled(true)
      }
    }

    updateEnabled()
    finePointerQuery.addEventListener('change', updateEnabled)
    hoverQuery.addEventListener('change', updateEnabled)
    touchOnlyQuery.addEventListener('change', updateEnabled)
    mobileViewportQuery.addEventListener('change', updateEnabled)
    document.addEventListener('mousemove', enableOnMouse, { passive: true })
    document.addEventListener('pointermove', enableOnMouse, { passive: true })

    return () => {
      finePointerQuery.removeEventListener('change', updateEnabled)
      hoverQuery.removeEventListener('change', updateEnabled)
      touchOnlyQuery.removeEventListener('change', updateEnabled)
      mobileViewportQuery.removeEventListener('change', updateEnabled)
      document.removeEventListener('mousemove', enableOnMouse)
      document.removeEventListener('pointermove', enableOnMouse)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    document.body.classList.add('custom-cursor-enabled')

    const interactiveSelector = 'a, button, .gallery-item, .photo-item, .nav-item, .gallery-box'

    const moveCursor = (element, position) => {
      if (!element) return
      element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
    }

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e) => {
      const currentTarget = e.target instanceof Element ? e.target.closest(interactiveSelector) : null
      const previousTarget = e.relatedTarget instanceof Element ? e.relatedTarget.closest(interactiveSelector) : null

      if (currentTarget && currentTarget !== previousTarget) {
        cursorRef.current?.classList.add('hover')
      }
    }

    const handleMouseOut = (e) => {
      const currentTarget = e.target instanceof Element ? e.target.closest(interactiveSelector) : null
      const nextTarget = e.relatedTarget instanceof Element ? e.relatedTarget.closest(interactiveSelector) : null

      if (currentTarget && currentTarget !== nextTarget) {
        cursorRef.current?.classList.remove('hover')
      }
    }

    const animate = () => {
      const target = mousePosition.current
      const follower = followerPosition.current

      follower.x += (target.x - follower.x) * 0.18
      follower.y += (target.y - follower.y) * 0.18

      moveCursor(cursorRef.current, target)
      moveCursor(followerRef.current, follower)

      animationFrame.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.body.classList.remove('custom-cursor-enabled')
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
      />
      <div
        ref={followerRef}
        className="cursor-follower"
      />
    </>
  )
}

