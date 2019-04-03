import React, { FunctionComponent, ReactElement } from 'react'
import useCumulativeHeightState from '../hooks/useCumulativeHeightState'
import StickyRow from './StickyRow'

interface Props {
  children: ReactElement | ReactElement[]
}

const StickyRows: FunctionComponent<Props> = ({ children }: Props) => {
  const { updateRowHeight, getAccumulatedHeight } = useCumulativeHeightState()

  return (
    <React.Fragment>
      {React.Children.map(children, (child, index) => (
        <StickyRow
          sticky={child.props.sticky}
          onResize={(height: number) => updateRowHeight({ height, index })}
          offset={getAccumulatedHeight(index)}
        >
          {child}
        </StickyRow>
      ))}
    </React.Fragment>
  )
}

export default StickyRows
