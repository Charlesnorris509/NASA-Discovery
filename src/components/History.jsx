import React from 'react';

const History = ({ history, onSelectHistoryItem, currentItem }) => {
  return (
    <div className="history">
      <h3>History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div
            key={index}
            className={`history-item ${currentItem?.date === item.date ? 'active' : ''}`}
            onClick={() => onSelectHistoryItem(item)}
          >
            <img
              src={item.url}
              alt={item.title}
              className="history-thumbnail"
            />
            <div className="history-item-info">
              <span className="history-date">{item.date}</span>
              <span className="history-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;