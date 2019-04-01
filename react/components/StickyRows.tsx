import React from 'react'
import CumulativeHeight from './CumulativeHeight'

interface Props {
  children: JSX.Element[]
  isSticky(): boolean
}

const StickyRows = ({ children, isSticky }: Props) => {
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
