import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateListTitle, deleteList } from '../../features/board/boardSlice';
import ConfirmDialog from '../UI/ConfirmDialog';

const ListHeader = ({ list }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(updateListTitle({ listId: list.id, newTitle: title }));
      setIsEditing(false);
    }
  };
  
  const handleDelete = () => {
    dispatch(deleteList(list.id));
  };
  
  return (
    <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 rounded-t transition-colors">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow p-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onBlur={handleSubmit}
          />
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <h3 
            className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer transition-colors" 
            onClick={() => setIsEditing(true)}
          >
            {list.title}
          </h3>
          <div className="flex">
            <button 
              onClick={() => setIsEditing(true)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsConfirmingDelete(true)}
              className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <ConfirmDialog
        isOpen={isConfirmingDelete}
        onClose={() => setIsConfirmingDelete(false)}
        onConfirm={handleDelete}
        title="Delete List"
        message={`Are you sure you want to delete the "${list.title}" list and all its cards? This action cannot be undone.`}
      />
    </div>
  );
};

export default ListHeader;