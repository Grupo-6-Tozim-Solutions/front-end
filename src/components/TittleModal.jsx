import React, { useState } from 'react';

const TittleModal = ({ modalName, onClose, NameStyle, nameContainer, isEditable, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(modalName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (onNameChange) onNameChange(currentName); // Notifica o componente pai sobre a mudança
  };

  return (
    <div style={nameContainer}>
      <div style={titleWrapperStyle}>
        {isEditing ? (
          <input
            type="text"
            value={currentName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            style={inputStyle}
            autoFocus
          />
        ) : (
          <span style={NameStyle}>{currentName}</span>
        )}
        {isEditable && (
          <button style={buttonEditStyle} onClick={handleEditClick}>
            <img
              src="./assets/pencilWhite.png"
              alt="Editar"
              style={{ width: '17px', height: '17px', padding: '0px', alignItems: 'center' }}
            />
          </button>
        )}
      </div>
      <button style={buttonExitStyle} onClick={onClose}>
        <img
          src="./assets/btnClose.png"
          alt="Fechar"
          style={{ width: '17px', height: '17px', padding: '0px', alignItems: 'center' }}
        />
      </button>
    </div>
  );
};

// Estilos padrão


const titleWrapperStyle = {
  display: 'flex',
  alignItems: 'center', // Espaço entre o título e o botão de edição
  justifyContent: 'center',
  width: '100%',
  marginLeft: '8%',
  gap: '1%',

};

const buttonExitStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '18px',
};

const buttonEditStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0px',
  width: '2%',
  height: '100%',
  outline: 'none',
};

const inputStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '4px',
  width: 'auto',
  backgroundColor: '#0740DA',
  width: '15%',
  outline: 'none',
};

export default TittleModal;