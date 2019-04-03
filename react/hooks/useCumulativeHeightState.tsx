import React from 'react'

interface State {
  [id: string]: number
}

interface UpdateAction {
  type: 'update'
  payload: {
    index: number
    height: number
  }
}

type Actions = UpdateAction

const reducer = (state: State, action: Actions) => {
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
  const [state, dispatch]: [State, React.Dispatch<UpdateAction>] = React.useReducer(reducer, {})

  const updateRowHeight = ({ height, index }: { height: number, index: number }) => {
    if (state[index] === height) {
      return
    }

    dispatch({
      payload: {
        height,
        index,
      },
      type: 'update',
    })
  }

  const getAccumulatedHeight = (index: number) => {
    const sortedIndices = Object.keys(state)
      .map(key => parseInt(key, 10))
      .sort()

    const indices = sortedIndices.slice(0, sortedIndices.indexOf(index))

    return indices.reduce((acc, cur) => (state[cur] || 0) + acc ,0)
  }

  return {
    getAccumulatedHeight,
    updateRowHeight,
  }
}

export default useCumulativeHeightState
