import React from 'react';

const TitleModal = ({ modalName, onClose, NameStyle }) => {
  return (
    <div style={nameContainer}>
      <span style={NameStyle}>{modalName}</span>
      <button style={buttonExitStyle} onClick={onClose}>
        <img
          src="public/assets/btnClose.png"
          alt="btnClose"
          style={{ width: '15px', height: '15px', padding: '0px' }}
        />
      </button>
    </div>
  );
};

// Estilos padrão
const nameContainer = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  width: '85vh',
  height: '7vh',
  background: '#0740DA',
  padding: '3px',
  borderRadius: '10px 10px 0px 0px',
  
};

const buttonExitStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
  
};




export default TitleModal;