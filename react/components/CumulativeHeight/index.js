import React from 'react'
import ReactResizeDetector from 'react-resize-detector'

import useCumulativeHeightState from './hooks/useCumulativeHeightState'

const CumulativeHeight = ({
  children,
  shouldAccumulateRow,
  renderCumulativeRow,
}) => {
  const { handleResize, getAccumulatedHeight } = useCumulativeHeightState()

  return React.Children.map(children, (child, index) => {
    if (shouldAccumulateRow(child, index)) {
      const wrappedRow = (
        <div>
          {child}
          <ReactResizeDetector
            handleHeight
            onResize={(width, height) =>
              handleResize({ height, index })
            }/>
        </div>
      )

      return renderCumulativeRow(wrappedRow, getAccumulatedHeight(index))
    }

    return child
  })
}

export default CumulativeHeight