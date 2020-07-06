import { useReducer } from 'react'

const initialState = {
  friends: [],
  history: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add-friend':
      return {
        ...state,
        friends: [...state.friends, action.friend],
        history: [...state.history, state],
      }
    case 'undo': {
      const isEmpty = !state.history.length
      if (isEmpty) return state
      return { ...state.history[state.history.length - 1] }
    }
    default:
      return state
  }
}

const useApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSubmit = (friend) => (e) => {
    e.preventDefault()
    if (!friend.name) return
    dispatch({ type: 'add-friend', friend })
  }

  const undo = () => {
    dispatch({ type: 'undo' })
  }

  return {
    ...state,
    onSubmit,
    undo,
  }
}

export default useApp