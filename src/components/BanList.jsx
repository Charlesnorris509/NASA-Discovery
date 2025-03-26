import React from 'react';

const BanList = ({ bannedItems, onRemoveBan }) => {
  return (
    <div className="ban-list">
      <h3>Banned Attributes</h3>
      {bannedItems.length === 0 ? (
        <p>No banned items</p>
      ) : (
        <ul>
          {bannedItems.map((item, index) => (
            <li 
              key={index}
              onClick={() => onRemoveBan(index)}
              className="banned-item"
              title="Click to remove"
            >
              {item.attribute}: {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BanList;