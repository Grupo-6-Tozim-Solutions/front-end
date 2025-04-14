import React from 'react';
import TitleModal from './TittleModal';


const Modal = ({ isOpen, onClose, modalName, title, message, onConfirm,
   confirmText = "Confirmar", cancelText = "Cancelar", NameStyle, imagem,
  textButtonDelete}) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
      <TitleModal
          modalName={modalName}
          NameStyle={NameStyle}
          onClose={onClose}
        />
        <div style={boxContainer}>
        <span style={titleStyle}>{title}</span>
        <span style={messageStyle}>{message}</span>
        <button onClick={() => onConfirm()}  style={buttonDelete}>
        <img style={imageButton} src={imagem} alt="" />
        <span style={textButtonDeleteStyle}>{textButtonDelete}</span>
        </button>
        <span style={modalInformation}>
          Clique fora desse POP-UP ou no X para cancelar a ação
        </span>
        </div>
      </div>
    </div>
  );
};  


const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };


  const imageButton = {
    width: '15px',
    height: '15px',
    display: 'flex',
    padding: '0px',
  };

  const buttonDelete = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFC9C9',
    height: '25px',
    width: '9vw',
    gap: '5px',
    borderRadius: '5px',
    border: 'none',
    marginTop: '25px',
    marginBottom: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',

  }


  const textButtonDeleteStyle = {
    fontSize: '13px',
    fontWeight: 'semibold',
    fotFamily: 'Inter',
    color: '#FF0D0D',
    display: 'flex',
  }


  const modalInformation = {
    fontSize: '12px',

  }

    const boxContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    }


  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'semibold',
    fotFamily: 'Inter',
  };

  const messageStyle = {
    fontSize: '13px',
  };
  
  const contentStyle = {
    background: 'white',   
    borderRadius: '10px 10px 10px 10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '205px',
  };
  
  

export default Modal;