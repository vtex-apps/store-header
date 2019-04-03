import React from 'react'
import useCumulativeHeightState from '../hooks/useCumulativeHeightState'
import StickyRow from './StickyRow'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const StickyRows = ({ children }: Props) => {
  const { updateRowHeight, getAccumulatedHeight } = useCumulativeHeightState()

  return (
    React.Children.map(children, (child, index) => (
      <StickyRow
        sticky={child.props.sticky}
        onResize={(height: number) => updateRowHeight({ height, index })}
        offset={getAccumulatedHeight(index)}
      >
        {child}
      </StickyRow>
    ))
  )
}

export default StickyRows