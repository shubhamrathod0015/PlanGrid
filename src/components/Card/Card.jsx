import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardContent from './CardContent';
import CardActions from './CardActions';
import { getItemStyle } from '../../utils/dragDropUtils';

const Card = ({ card, index, listId, onEdit, onDelete }) => {
  return (
    <Draggable 
      draggableId={`card-${card.id}`} 
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="bg-card-bg-light dark:bg-card-bg-dark rounded shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="p-3">
            <CardContent card={card} />
            <CardActions 
              card={card} 
              listId={listId} 
              onEdit={onEdit} 
              onDelete={onDelete}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;