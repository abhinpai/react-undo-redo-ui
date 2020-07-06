import React, { useReducer } from 'react';
import { type } from 'os';

const initialState = {
  nodes: [],
  history: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        nodes: [...state.nodes, action.nodeCount],
        history: [...state.history, state],
      };
    case 'undo':
      const isEmpty = !state.nodes.length;
      return isEmpty
        ? state
        : {
            ...state.history[state.history.length - 1],
          };
    default:
      return {
        ...state,
      };
  }
};

const useUR = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onSubmit = (clickEvent, nodeNo) => {
    dispatch({ type: clickEvent, nodeCount: nodeNo });
  };
  return {
    ...state,
    onSubmit,
  };
};

export default useUR;
