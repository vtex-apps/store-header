import { useState, useLayoutEffect } from 'react'
import useScroll from './useScroll'

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
