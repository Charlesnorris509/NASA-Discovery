import React from 'react';

const CurrentItem = ({ item, onBanAttribute }) => {
  if (!item) return <div>Loading...</div>;

  const handleAttributeClick = (attribute, value) => {
    onBanAttribute({ attribute, value });
  };

  return (
    <div className="current-item">
      <h2 onClick={() => handleAttributeClick('title', item.title)}>{item.title}</h2>
      {item.media_type === 'image' ? (
        <img src={item.url} alt={item.title} className="apod-image" />
      ) : (
        <iframe src={item.url} title={item.title} className="apod-video" />
      )}
      <div className="item-details">
        <p className="date" onClick={() => handleAttributeClick('date', item.date)}>
          Date: {item.date}
        </p>
        {item.copyright && (
          <p className="copyright" onClick={() => handleAttributeClick('copyright', item.copyright)}>
            Copyright: {item.copyright}
          </p>
        )}
        <p className="media-type" onClick={() => handleAttributeClick('media_type', item.media_type)}>
          Media Type: {item.media_type}
        </p>
        <p className="service-version" onClick={() => handleAttributeClick('service_version', item.service_version)}>
          Service Version: {item.service_version}
        </p>
        <p className="explanation">{item.explanation}</p>
      </div>
    </div>
  );
};

export default CurrentItem;