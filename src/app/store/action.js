const types = {
  SELECT_ANSWER: 'SELECT_ANSWER'
}

export const select = (id, selected, score) => ({
  type: types.SELECT_ANSWER,
  id, selected, score
})
