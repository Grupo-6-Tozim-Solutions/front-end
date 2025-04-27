import React, { useState } from 'react';

const CustomButton = ({ imageSrc, imageStyle, text, buttonStyle, onClick, enableHover = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const combinedButtonStyle = {
    ...defaultButtonStyle,
    ...buttonStyle,
    ...(enableHover && isHovered ? hoverButtonStyle : {}),
  };

  return (
    <button
      style={combinedButtonStyle}
      onClick={onClick}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
    >
      {imageSrc && <img src={imageSrc} alt="button-icon" style={{ ...defaultImageStyle, ...imageStyle }} />}
      <span style={defaultTextStyle}>{text}</span>
    </button>
  );
};

// Estilos padrão
const defaultButtonStyle = {
  color: '#FF0D0D',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 28px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  transition: 'background-color 0.3s, transform 0.2s',

};

const hoverButtonStyle = {
  backgroundColor: '#A0E89B', // Cor levemente diferente
  transform: 'scale(1.03)',   // Cresce no hover
};

const defaultImageStyle = {
  width: '20px',
  height: '20px',
  marginRight: '7px',
};

const defaultTextStyle = {
  fontSize: '16px',
  fontWeight: '500',
};

export default CustomButton;
