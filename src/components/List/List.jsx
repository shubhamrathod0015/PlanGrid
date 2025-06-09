import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Card from '../Card/Card';
import AddCard from '../Card/AddCard';
import ListHeader from './ListHeader';
import Button from '../UI/Button';
import { deleteCard, updateCard } from '../../features/board/boardSlice';
import { getListStyle } from '../../utils/dragDropUtils';
import Modal from '../UI/Modal';
import ConfirmDialog from '../UI/ConfirmDialog';

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [deletingCardId, setDeletingCardId] = useState(null);
  
  const handleEditCard = (card, listId) => {
    setEditingCard({ ...card, listId });
  };
  
  const handleUpdateCard = (e) => {
    e.preventDefault();
    if (editingCard) {
      dispatch(updateCard({
        cardId: editingCard.id,
        listId: editingCard.listId,
        updates: {
          content: editingCard.content,
          labels: editingCard.labels
        }
      }));
      setEditingCard(null);
    }
  };
  
  const handleDeleteCard = (cardId, listId) => {
    setDeletingCardId({ cardId, listId });
  };
  
  const confirmDeleteCard = () => {
    dispatch(deleteCard({
      cardId: deletingCardId.cardId,
      listId: deletingCardId.listId
    }));
  };
  
  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-list-bg-light dark:bg-list-bg-dark rounded shadow-sm transition-colors">
        <ListHeader list={list} />
        
        <Droppable droppableId={list.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
              className="min-h-[100px] p-2 bg-gray-50 dark:bg-gray-800 transition-colors"
            >
              {list.cards.map((card, index) => (
                <Card 
                  key={card.id} 
                  card={card} 
                  index={index} 
                  listId={list.id}
                  onEdit={handleEditCard}
                  onDelete={handleDeleteCard}
                />
              ))}
              {provided.placeholder}
              
              {isAddingCard ? (
                <AddCard 
                  listId={list.id} 
                  onCancel={() => setIsAddingCard(false)} 
                />
              ) : (
                <Button
                  onClick={() => setIsAddingCard(true)}
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-gray-600 dark:text-gray-400 flex items-center justify-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add a card
                </Button>
              )}
            </div>
          )}
        </Droppable>
      </div>
      
      {/* Edit Card Modal */}
      <Modal
        isOpen={!!editingCard}
        onClose={() => setEditingCard(null)}
        title="Edit Card"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingCard(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateCard}>
              Save Changes
            </Button>
          </>
        }
      >
        {editingCard && (
          <form onSubmit={handleUpdateCard}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <textarea
                value={editingCard.content}
                onChange={(e) => setEditingCard({...editingCard, content: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Labels (comma separated)
              </label>
              <input
                type="text"
                value={editingCard.labels.join(', ')}
                onChange={(e) => setEditingCard({
                  ...editingCard, 
                  labels: e.target.value.split(',').map(label => label.trim()).filter(Boolean)
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        )}
      </Modal>
      
      {/* Delete Card Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingCardId}
        onClose={() => setDeletingCardId(null)}
        onConfirm={confirmDeleteCard}
        title="Delete Card"
        message="Are you sure you want to delete this card? This action cannot be undone."
      />
    </div>
  );
};

export default List;