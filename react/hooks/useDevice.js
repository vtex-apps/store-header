import { useState, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { CONSTANTS } from '../components/Helpers'

/**
 * Hook that handles dynamic device change on resize
 * @param {*} mobileBreakpoint : Break point of mobile change
 */
const useDevice = (mobileBreakpoint = CONSTANTS.RESIZE_BREAKPOINTS.MOBILE) => {
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
