import { useState, useEffect } from 'react'

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
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scroll }
}

export default useScroll
