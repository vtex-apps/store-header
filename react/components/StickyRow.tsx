import React, {
  FunctionComponent,
  useContext,
  CSSProperties,
  useRef,
} from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { RowContext } from './StickyRows'
import { useScrollOffset } from '../hooks/useScrollOffset'

interface Props {
  sticky?: boolean
  zIndex?: number
}

const CSS_HANDLES = ['headerStickyRow'] as const

const StickyRow: FunctionComponent<Props> = ({ children, sticky, zIndex }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { offset, onResize } = useContext(RowContext)
  const { scroll } = useScrollOffset()
  const ref = useRef<HTMLDivElement>(null)

  const stickyStyle: CSSProperties = {
    top: offset,
    zIndex,
  }

  const mainCssHandle =
    sticky &&
    scroll >= offset &&
    ref.current &&
    scroll >= ref.current.offsetTop - window.pageYOffset
      ? applyModifiers(handles.headerStickyRow, 'fixed')
      : handles.headerStickyRow

  return (
    <div
      ref={ref}
      style={sticky ? stickyStyle : undefined}
      className={`${mainCssHandle} ${
        sticky ? `sticky ${!zIndex ? 'z-999' : ''}` : ''
      }`}
    >
      {children}

      {sticky && (
        <ReactResizeDetector
          handleHeight
          onResize={(_, height) => {
            onResize(height)
          }}
        />
      )}
    </div>
  )
}

export default StickyRow
