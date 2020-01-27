import { useState } from 'react'

type State = Record<number, number>

const useCumulativeHeightState = () => {
  const [state, set] = useState<State>({})

  const updateRowHeight = ({
    height,
    index,
  }: {
    height: number
    index: number
  }) => {
    if (state[index] === height) {
      return
    }

    set(prev => ({ ...prev, [index]: height }))
  }

  const getAccumulatedHeight = (index: number) => {
    const sortedIndices = Object.keys(state)
      .map(key => parseInt(key, 10))
      .sort((a, b) => a - b)

    const indices = sortedIndices.slice(0, sortedIndices.indexOf(index))
    return indices.reduce((acc, cur) => (state[cur] || 0) + acc, 0)
  }

  return {
    getAccumulatedHeight,
    updateRowHeight,
  }
}

export default useCumulativeHeightState
