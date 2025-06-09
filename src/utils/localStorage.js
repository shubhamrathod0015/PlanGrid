// Save state to localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('kanbanState', serializedState);
    return true;
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
    return false;
  }
};

// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('kanbanState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

// Clear state from localStorage
export const clearState = () => {
  try {
    localStorage.removeItem('kanbanState');
    return true;
  } catch (error) {
    console.error('Error clearing state from localStorage:', error);
    return false;
  }
};