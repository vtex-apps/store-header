import React, { FunctionComponent, useContext, CSSProperties } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { RowContext } from './StickyRows'

interface Props {
  sticky?: boolean
  zIndex?: number
}

const StickyRow: FunctionComponent<Props> = ({ children, sticky, zIndex }) => {
  const { offset, onResize } = useContext(RowContext)

  const stickyStyle: CSSProperties = {
    position: 'sticky',
    top: offset,
    zIndex,
  }

  return (
    <div
      style={sticky ? stickyStyle : undefined}
      className={sticky && !zIndex ? 'z-999' : ''}
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
