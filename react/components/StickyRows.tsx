import type { PropsWithChildren } from 'react'
import React from 'react'

import useCumulativeHeightState from '../hooks/useCumulativeHeightState'

type RowContextType = {
  onResize(height: number): void
  offset: number
}

const RowContext = React.createContext<RowContextType>({
  onResize: () => {},
  offset: 0,
})

// eslint-disable-next-line @typescript-eslint/ban-types
function StickyRows({ children }: PropsWithChildren<{}>) {
  const { updateRowHeight, getAccumulatedHeight } = useCumulativeHeightState()

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <RowContext.Provider
          value={{
            onResize: (height: number) => updateRowHeight({ height, index }),
            offset: getAccumulatedHeight(index),
          }}
        >
          {child}
        </RowContext.Provider>
      ))}
    </>
  )
}

export default StickyRows

export { RowContext }
