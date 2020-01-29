import React, { FunctionComponent, useContext } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { RowContext } from './StickyRows'
import { useScrollThreshold } from '../hooks/useScrollOffset'

interface Props {
  zIndex?: number
}

const CSS_HANDLES = ['headerStickyRow'] as const

const StickyRow: FunctionComponent<Props> = ({ children, zIndex }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { offset, onResize } = useContext(RowContext)

  const { ref, hasReachedThreshold } = useScrollThreshold({ offset })
  const mainCssHandle = hasReachedThreshold
    ? applyModifiers(handles.headerStickyRow, 'fixed')
    : handles.headerStickyRow

  return (
    <div
      ref={ref}
      style={{ top: offset, zIndex }}
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
