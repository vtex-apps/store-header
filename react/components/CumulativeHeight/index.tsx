import React from 'react'
import ReactResizeDetector from 'react-resize-detector'

import useCumulativeHeightState from './hooks/useCumulativeHeightState'

interface Props {
  children: JSX.Element[]
  shouldAccumulateRow(child: JSX.Element, index: number): boolean
  renderCumulativeRow(row: JSX.Element, height: number): JSX.Element
}

const CumulativeHeight = ({
  children,
  shouldAccumulateRow,
  renderCumulativeRow,
}: Props) => {
  const { handleResize, getAccumulatedHeight } = useCumulativeHeightState()

  return (
    <React.Fragment>
      {React.Children.map(children, (child, index) => {
        if (shouldAccumulateRow(child, index)) {
          const wrappedRow = (
            <div>
              {child}
              <ReactResizeDetector
                handleHeight
                onResize={(width: number, height: number) =>
                  handleResize({ height, index })
                }/>
            </div>
          )

          return renderCumulativeRow(wrappedRow, getAccumulatedHeight(index))
        }

        return child
      })}
    </React.Fragment>
  )
}

export default CumulativeHeight