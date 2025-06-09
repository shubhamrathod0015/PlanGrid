import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveCard } from '../../features/board/boardSlice';
import { selectLists } from '../../features/board/selectors';
import List from '../List/List';
import AddList from '../List/AddList';
import BoardHeader from './BoardHeader';

const Board = () => {
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside a valid droppable
    if (!destination) return;
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Handle card movement
    if (draggableId.startsWith('card-')) {
      dispatch(moveCard({
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }));
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <BoardHeader />
      
      <div className="flex-grow p-4 overflow-x-auto bg-board-bg-light dark:bg-board-bg-dark transition-colors">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex space-x-4 min-h-[calc(100vh-150px)]">
            {lists.map(list => (
              <List key={list.id} list={list} />
            ))}
            <AddList />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;