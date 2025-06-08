import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Initial sample data
const initialState = {
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', content: 'Research React best practices', labels: ['research'] },
        { id: 'card-2', content: 'Create project wireframes', labels: ['design'] },
      ],
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', content: 'Implement basic UI components', labels: ['development'] },
      ],
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [
        { id: 'card-4', content: 'Set up project repository', labels: ['setup'] },
      ],
    },
  ],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // List operations
    addList: (state, action) => {
      const newList = {
        id: uuidv4(),
        title: action.payload,
        cards: [],
      };
      state.lists.push(newList);
    },
    updateListTitle: (state, action) => {
      const { listId, newTitle } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.title = newTitle;
      }
    },
    deleteList: (state, action) => {
      const listId = action.payload;
      state.lists = state.lists.filter(list => list.id !== listId);
    },
    
    // Card operations
    addCard: (state, action) => {
      const { listId, content, labels = [] } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const newCard = {
          id: uuidv4(),
          content,
          labels,
        };
        list.cards.push(newCard);
      }
    },
    updateCard: (state, action) => {
      const { cardId, listId, updates } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const card = list.cards.find(card => card.id === cardId);
        if (card) {
          Object.assign(card, updates);
        }
      }
    },
    deleteCard: (state, action) => {
      const { cardId, listId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.cards = list.cards.filter(card => card.id !== cardId);
      }
    },
    
    // Drag and drop operations
    moveCard: (state, action) => {
      const { sourceListId, destinationListId, sourceIndex, destinationIndex } = action.payload;
      
      // Find source and destination lists
      const sourceList = state.lists.find(list => list.id === sourceListId);
      const destinationList = state.lists.find(list => list.id === destinationListId);
      
      if (sourceList && destinationList) {
        // Remove card from source list
        const [movedCard] = sourceList.cards.splice(sourceIndex, 1);
        
        // Insert card into destination list
        destinationList.cards.splice(destinationIndex, 0, movedCard);
      }
    },
  },
});

export const { 
  addList, updateListTitle, deleteList,
  addCard, updateCard, deleteCard,
  moveCard 
} = boardSlice.actions;

export default boardSlice.reducer;