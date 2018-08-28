const reducer = (state = {
  totalScore: 0,
  question: []
}, action) => {
  switch (action.type) {
    case 'SELECT_ANSWER': {
      const { id, selected, score } = action

      if (id && selected && score) {
        return {
          totalScore: state.totalScore + score,
          question: [
            ...state.question,
            {
              id,
              selected,
              score
            }
          ]
        }
      }
      return state
    }
    default: {
      return state
    }
  }
}

export default reducer
