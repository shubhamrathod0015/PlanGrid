// Simple selectors for board state
export const selectLists = state => state.board.lists;

export const selectListById = (state, listId) => 
  state.board.lists.find(list => list.id === listId);

export const selectCardById = (state, { listId, cardId }) => {
  const list = state.board.lists.find(list => list.id === listId);
  if (list) {
    return list.cards.find(card => card.id === cardId);
  }
  return null;
};