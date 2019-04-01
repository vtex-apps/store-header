import React from 'react'

const reducer = (state, action) => {
  switch(action.type) {
    case 'update':
      return {
        ...state,
        [action.payload.index]: action.payload.height,
      }
    default:
      return state
  }
}

const useCumulativeHeightState = () => {
  const [state, dispatch] = React.useReducer(reducer, {})

  const handleResize = ({ height, index }) => {
    dispatch({
      type: 'update',
      payload: {
        index,
        height,
      }
    })
  }

  const getAccumulatedHeight = index => {
    const sortedIndices = Object.keys(state)
      .map(key => parseInt(key, 10))
      .sort()

    const indices = sortedIndices.slice(0, sortedIndices.indexOf(index))

    return indices.reduce((acc, cur) => (state[cur] || 0) + acc ,0)
  }

  return {
    handleResize,
    getAccumulatedHeight,
  }
}

export default useCumulativeHeightState