import React, { useState } from 'react';

const ArrowButton = ({ iconSrc, altText, backgroundColor, onClick, buttonStyle, imageStyle }) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = isHovered
    ? {
        transform: 'scale(1.1)',
        filter: 'brightness(1.1)',
      }
    : {};

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: backgroundColor,
        border: 'none',
        borderRadius: '6px',
        width: '1%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
        outline: 'none',
        ...buttonStyle,
        ...hoverStyle,
      }}
    >
      <img 
        src={iconSrc}
        alt={altText}
        style={{
          width: '20px',
          height: '12px',
          padding: '0px',
          ...imageStyle
        }} 
      />
    </button>
  );
};

export default ArrowButton;
