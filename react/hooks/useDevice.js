import { useState, useEffect } from 'react'
import { debounce } from 'debounce'

/**
 * Hook that handles dynamic device change on resize
 * @param {Number} mobileBreakpoint - break point of mobile change
 * @returns {Boolean, Boolean} - if its mobile or desktop
 */
const useDevice = (mobileBreakpoint = 640) => {
  const [mobile, setMobile] = useState(window.innerWidth <= mobileBreakpoint)
  const [desktop, setDesktop] = useState(window.innerWidth > mobileBreakpoint)

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= mobileBreakpoint)
      setDesktop(window.innerWidth > mobileBreakpoint)
    }
    const debounced = debounce(handleResize, 100)
    window.addEventListener('resize', debounced)
    return () => {
      window.removeEventListener('resize', debounced)
    }
  }, [mobileBreakpoint])

  return {
    mobile,
    desktop,
  }
}

export default useDevice
