import { useState, useLayoutEffect, useCallback } from 'react'
import throttle from 'throttleit'

const listeners = new Set<Function>()

const scrollHandler = throttle(() => {
  const scrollOffset = window.pageYOffset
  listeners.forEach(fn => fn(scrollOffset))
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
export function useScrollThreshold<T extends HTMLElement>({
  offset,
}: {
  offset: number
}) {
  // Initial element distance to the top of the container
  const [initialOffsetTop, setInitialOffsetTop] = useState<number>()
  const [hasReachedThreshold, setReachedThreshold] = useState(false)

  // We use this callback as a ref to get the instance of the element once its mounted
  // Reference: https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const mountedDivRef = useCallback(
    (node: T) => {
      if (node !== null) {
        // `offsetTop` can be used for position:sticky, but not for position:fixed
        // If we decide to change the css implementation for a js one, this should be revisited
        setInitialOffsetTop(node.offsetTop)
      }
    },
    // The rule below is disabled because we want to get a new callback every time
    // the `offset` changes, which is a way to listen for possible sticky row size changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset]
  )

  useLayoutEffect(
    () =>
      attach((scroll: number) => {
        const reached =
          initialOffsetTop != null && initialOffsetTop - scroll <= offset

        // checks if reached state has changed
        // if not, do nothing
        if (hasReachedThreshold === reached) return

        // otherwise, update the state
        setReachedThreshold(reached)
      }),
    [hasReachedThreshold, initialOffsetTop, offset]
  )

  return {
    hasReachedThreshold,
    ref: mountedDivRef,
  }
}
