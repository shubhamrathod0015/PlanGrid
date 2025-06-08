import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import themeReducer from '../features/theme/themeSlice';

// Middleware to save state to localStorage
const localStorageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem('kanbanState', JSON.stringify(store.getState()));
  return result;
};

// Load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('kanbanState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Error loading state from localStorage:', e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    board: boardReducer,
    theme: themeReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;