import React, {
  FunctionComponent,
  useContext,
  useCallback,
  useState,
} from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { RowContext } from './StickyRows'
import { useScrollOffset } from '../hooks/useScrollOffset'

interface Props {
  zIndex?: number
}

const CSS_HANDLES = ['headerStickyRow'] as const

const StickyRow: FunctionComponent<Props> = ({ children, zIndex }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { offset, onResize } = useContext(RowContext)
  const { scroll } = useScrollOffset()

  // Initial element distance to the top of the container
  const [initialOffsetTop, setInitialOffsetTop] = useState<number>()

  // We use this callback as a ref to get the instance of the element once its mounted
  // Reference: https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const mountedDivRef = useCallback(
    (node: HTMLDivElement) => {
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

  const stickyStyle = { top: offset, zIndex }

  const mainCssHandle =
    initialOffsetTop != null && initialOffsetTop - scroll <= offset
      ? applyModifiers(handles.headerStickyRow, 'fixed')
      : handles.headerStickyRow

  return (
    <div
      ref={mountedDivRef}
      style={stickyStyle}
      className={`${mainCssHandle} sticky ${!zIndex ? 'z-999' : ''}`}
    >
      {children}
      <ReactResizeDetector
        handleHeight
        onResize={(_, height) => {
          onResize(height)
        }}
      />
    </div>
  )
}

export default StickyRow
