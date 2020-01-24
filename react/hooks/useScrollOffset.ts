import { useState, useLayoutEffect } from 'react'
import throttle from 'throttleit'

const listeners = new Set<Function>()

const scrollHandler = throttle(() => {
  const scrollOffset = window.pageYOffset
  listeners.forEach(set => set(scrollOffset))
}, 100)

function detach(fn: Function) {
  listeners.delete(fn)
  if (listeners.size === 0) {
    window.removeEventListener('scroll', scrollHandler)
  }
}

function attach(fn: Function) {
  if (listeners.size === 0) {
    window.addEventListener('scroll', scrollHandler)
  }
  listeners.add(fn)
  return () => detach(fn)
}

/**
 * Hook that handles the scroll position.
 * It uses one single window scroll listener.
 * @returns {Number} - scroll position value
 */
export const useScrollOffset = () => {
  const [scroll, setScroll] = useState(0)
  useLayoutEffect(() => attach(setScroll), [])
  return { scroll }
}
