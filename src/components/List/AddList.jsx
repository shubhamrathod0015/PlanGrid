import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../../features/board/boardSlice';
import Button from '../UI/Button';

const AddList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addList(title));
      setTitle('');
      setIsAdding(false);
    }
  };
  
  if (!isAdding) {
    return (
      <div className="w-72 flex-shrink-0">
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300 transition-colors"
          variant="ghost"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add another list
        </Button>
      </div>
    );
  }
  
  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded shadow-sm transition-colors">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            autoFocus
          />
          <div className="flex justify-end space-x-2 mt-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              size="sm"
              disabled={!title.trim()}
            >
              Add List
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddList;