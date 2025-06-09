import React from 'react';

const CardContent = ({ card }) => {
  return (
    <div className="mb-2">
      <div className="text-sm text-gray-700 dark:text-gray-200">{card.content}</div>
      
      {card.labels && card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {card.labels.map(label => (
            <span 
              key={label} 
              className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardContent;