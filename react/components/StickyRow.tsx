import React, { FunctionComponent } from 'react'
import ReactResizeDetector from 'react-resize-detector'

interface Props {
  sticky?: boolean
  offset?: number
  onResize?(height?: number): void
}

const StickyRow: FunctionComponent<Props> = ({
  children,
  sticky,
  offset = 0,
  onResize,
}) => (
  <div
    style={sticky ? {
      position: 'sticky',
      top: offset,
      zIndex: 999,
    } : {}}>

    {children}

    {sticky && (
      <ReactResizeDetector
        handleHeight
        onResize={(_, height) => onResize && onResize(height)}/>
    )}
  </div>
)

export default StickyRow
