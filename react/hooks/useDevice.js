import { useState, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import debouce from 'lodash/debounce'

/**
 * Hook that handles dynamic device change on resize
 * @param {Number} mobileBreakpoint - break point of mobile change
 * @returns {Boolean, Boolean} - if its mobile or desktop
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
    const debounced = debouce(handleResize, 100)
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
