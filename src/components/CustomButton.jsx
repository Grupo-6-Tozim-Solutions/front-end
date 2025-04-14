import React from 'react';

const CustomButton = ({ imageSrc, imageStyle, text, buttonStyle, onClick }) => {
  return (
    <button style={{ ...defaultButtonStyle, ...buttonStyle }} onClick={onClick}>
      {imageSrc && <img src={imageSrc} alt="button-icon" style={{ ...defaultImageStyle, ...imageStyle }} />}
      <span style={defaultTextStyle}>{text}</span>
    </button>
  );
};

// Estilos padrão
const defaultButtonStyle = {
  backgroundColor: '#FFC9C9',
  color: '#FF0D0D',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 10px',
  cursor: 'pointer',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
};

const defaultImageStyle = {
  width: '16px',
  height: '16px',
  marginRight: '7px',
};

const defaultTextStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
};

export default CustomButton;