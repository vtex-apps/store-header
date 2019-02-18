import { useState, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'

/**
 * Hook that handles dynamic device change on resize
 * @param {Number} mobileBreakpoint - break point of mobile change
 * @returns {boolean, boolean} - if its mobile or desktop
 */
const useDevice = (mobileBreakpoint = 640) => {
  const { hints } = useRuntime()
  const [mobile, setMobile] = useState(hints.mobile)
  const [desktop, setDesktop] = useState(hints.desktop)

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= mobileBreakpoint)
      setDesktop(window.innerWidth > mobileBreakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileBreakpoint])

  return {
    mobile,
    desktop,
  }
}

export default useDevice
