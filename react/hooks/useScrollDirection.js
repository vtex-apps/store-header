import { useState, useLayoutEffect } from 'react'
import useScroll from './useScroll'

/**
 * Hook that handles the scroll direction
 * @returns {Number, Boolean, Boolean} - the current scroll value and if the scroll is up, or down
 */
const useScrollDirection = () => {
  const { scroll } = useScroll()
  const [scrollingUp, setScrollingUp] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)

  useLayoutEffect(() => {
    setLastScroll(scroll)
    setScrollingUp(lastScroll > scroll)
    setScrollingDown(lastScroll < scroll)
  }, [scroll])

  return { scroll, scrollingUp, scrollingDown }
}

export default useScrollDirection
