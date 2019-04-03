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
  onResize = () => 0,
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
        onResize={(width, height) => {
          if (sticky) {
            onResize(height)
          }
        }}/>
    )}
  </div>
)

export default StickyRow
