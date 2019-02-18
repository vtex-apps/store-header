import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

/**
 * Hook that handles the scroll position
 * @returns {Number} - scroll position value
 */
const useScroll = () => {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    const thorttled = throttle(handleScroll, 100)
    window.addEventListener('scroll', thorttled)
    return () => window.removeEventListener('scroll', thorttled)
  }, [])

  return { scroll }
}

export default useScroll
