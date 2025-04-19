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
  padding: '8px 28px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
};

const defaultImageStyle = {
  width: '20px',
  height: '20px',
  marginRight: '7px',
};

const defaultTextStyle = {
  fontSize: '16px',
  fontWeight: '600',
};

export default CustomButton;