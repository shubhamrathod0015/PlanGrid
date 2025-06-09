import React from 'react';
import Button from '../UI/Button';
import ThemeToggle from '../UI/ThemeToggle';
import { useDispatch } from 'react-redux';
import { clearState } from '../../utils/localStorage';

const BoardHeader = ({ onAddList }) => {
  const dispatch = useDispatch();
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the board to its initial state? This action cannot be undone.')) {
      clearState();
      window.location.reload();
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md transition-colors">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors">Kanban Board</h1>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={onAddList}
          className="px-4 py-2 bg-primary-light dark:bg-primary text-white rounded hover:bg-primary dark:hover:bg-primary-dark 
                     transition-colors"
        >
          Add List
        </button>
        <ThemeToggle />
        <Button 
          variant="ghost" 
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={handleReset}
        >
          Reset Board
        </Button>
      </div>
    </div>
  );
};

export default BoardHeader;