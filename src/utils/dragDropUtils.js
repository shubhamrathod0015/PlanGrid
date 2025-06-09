// Helper function to get item style when dragging
export const getItemStyle = (isDragging, draggableStyle) => ({
  // Basic styles to make items look better when dragging
  userSelect: 'none',
  padding: '8px',
  margin: '0 0 8px 0',
  background: isDragging ? 'var(--dragging-card-bg, #e0f7fa)' : 'var(--card-bg, #ffffff)',
  boxShadow: isDragging ? '0 5px 10px rgba(0, 0, 0, 0.1)' : 'none',
  borderRadius: '4px',
  
  // Styles we need to apply on draggables
  ...draggableStyle,
});

// Helper function to get list style when dragging over
export const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'var(--dragging-list-bg, #f0f9ff)' : 'var(--list-bg, #f1f5f9)',
  padding: '8px',
  borderRadius: '4px',
  minHeight: '100px',
  transition: 'background-color 0.2s ease',
});

// Parse data from draggable id (format: type-id)
export const parseId = (id) => {
  const parts = id.split('-');
  return {
    type: parts[0],
    id: parts.slice(1).join('-'),
  };
};