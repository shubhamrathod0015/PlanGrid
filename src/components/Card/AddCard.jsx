import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../../features/board/boardSlice';
import Button from '../UI/Button';

const AddCard = ({ listId, onCancel }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(addCard({ listId, content, labels: [] }));
      setContent('');
      onCancel();
    }
  };
  
  return (
    <div className="p-2 bg-white dark:bg-gray-700 rounded shadow border border-gray-200 dark:border-gray-600 transition-colors">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter card content..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          rows={3}
          autoFocus
        />
        <div className="flex justify-end space-x-2 mt-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            size="sm"
            disabled={!content.trim()}
          >
            Add Card
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;