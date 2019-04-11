import React, { FunctionComponent, useContext, CSSProperties } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { RowContext } from './StickyRows'

interface Props {
  sticky?: boolean
}

const StickyRow: FunctionComponent<Props> = ({ children, sticky }) => {
  const { offset, onResize } = useContext(RowContext)

  const stickyStyle: CSSProperties = {
    position: 'sticky',
    top: offset,
    zIndex: 9,
  }

  return (
    <div style={sticky ? stickyStyle : undefined}>
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
