import type { FunctionComponent, CSSProperties } from 'react'
import React, { useContext } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import { RowContext } from './StickyRows'

const CSS_HANDLES = ['headerStickyRow'] as const

interface Props {
  sticky?: boolean
  zIndex?: number
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const StickyRow: FunctionComponent<Props> = ({
  children,
  sticky,
  zIndex,
  classes,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES, {
    classes,
  })

  const { offset, onResize } = useContext(RowContext)

  const stickyStyle: CSSProperties = {
    top: offset,
    zIndex,
  }

  return (
    <div
      style={sticky ? stickyStyle : undefined}
      className={`${handles.headerStickyRow} ${
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
