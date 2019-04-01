import React from 'react'
import CumulativeHeight from './CumulativeHeight'

const StickyRows = ({ children, isSticky }) => {
  return (
    <CumulativeHeight
      shouldAccumulateRow={isSticky}
      renderCumulativeRow={(row, height) => (
        <div
          style={{
            position: 'sticky',
            top: height,
            zIndex: 999,
          }}>
          {row}
        </div>
      )}>
      {children}
    </CumulativeHeight>
  )
}

export default StickyRows
