import type { PropsWithChildren } from 'react'
import React from 'react'

import useCumulativeHeightState from '../hooks/useCumulativeHeightState'

type RowContextType = {
  /** Callback executed when element is resized */
  onResize(height: number): void
  /** Vertical Offset from top of container */
  offset: number
}

const RowContext = React.createContext<RowContextType>({
  onResize: () => {},
  offset: 0,
})

/**
 * @deprecated Use the `vtex.sticky-layout` app instead
 */
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
