import React from 'react';

const TraceSpan = ({ span, selectedSpanId, onSpanClick }) => {

  const isSelected = span.id === selectedSpanId;
  
  const handleClick = () => {
    onSpanClick(span.id);
  };

  return (
    <div
      className={`trace-span ${isSelected ? 'selected' : ''} ${
        span.warning ? 'warning' : ''
      } ${span.error ? 'error' : ''}`}
      onClick={handleClick}
    >
      {/* Displaying span details */}
      <p>{span.name}</p>
      <p>{span.duration}</p>
      {/* ... Other span details you want to display */}
    </div>
  );
};

export default TraceSpan;
