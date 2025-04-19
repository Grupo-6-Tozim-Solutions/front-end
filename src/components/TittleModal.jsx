import React from 'react';

const TitleModal = ({ modalName, onClose, NameStyle, nameContainer}) => {
  return (
    <div style={nameContainer}>
      <span style={NameStyle}>{modalName}</span>
      <button style={buttonExitStyle} onClick={onClose}>
        <img
          src="public/assets/btnClose.png"
          alt="btnClose"
          style={{ width: '17px', height: '17px', padding: '0px', alignItems:'center' }}
        />
      </button>
    </div>
  );
};

// Estilos padrão

const buttonExitStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};




export default TitleModal;