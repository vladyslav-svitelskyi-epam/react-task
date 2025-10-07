import React from 'react';

const Cell = React.memo(function Cell({ value, isHovered, isHighlighted, onMouseEnter, onMouseLeave }) {
  let style = {};
  if (isHovered && typeof value === 'number') {
    style.background = `linear-gradient(to top, #4caf50 ${value}%, transparent ${value}%)`;
    style.fontWeight = 'bold';
  }

  return (
    <div
      className={`cell${isHovered ? ' cell-hovered' : ''}${isHighlighted ? ' cell-highlighted' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {value}
    </div>
  );
});

export default Cell;
