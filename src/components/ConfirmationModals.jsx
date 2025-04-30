import React from 'react';
import TitleModal from './TittleModal';


const Modal = ({ isOpen, title, message, onConfirm, imagem,textButtonDelete, onClose}) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
      <TitleModal
          modalName="Sair"
          NameStyle={NameStyle}
          nameContainer={nameContainer}
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

  const nameContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '75vh',
    height: '5vh',
    background: 'var(--primary-color)',
    padding: '3px',
    borderRadius: '10px 10px 0px 0px',
  };

  const NameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    flex: '1',
    marginLeft:'12%'
};



  const imageButton = {
    width: '18px',
    height: '18px',
    display: 'flex',
    padding: '0px',
  };

  const buttonDelete = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFC9C9',
    height: '32px',
    width: '6vw',
    gap: '5px',
    borderRadius: '5px',
    border: 'none',
    marginTop: '25px',
    marginBottom: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    justifyContent:'center'

  }


  const textButtonDeleteStyle = {
    fontSize: '14px',
    fontWeight: '600',
    fotFamily: 'Inter',
    color: '#FF0D0D',
    display: 'flex',
  }


  const modalInformation = {
    fontSize: '13px',
    fontWeight: '600'

  }

    const boxContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'4%'
    }


  const titleStyle = {
    fontSize: '22px',
    fontWeight: '600',
    fotFamily: 'Inter',
  };

  const messageStyle = {
    fontSize: '14px',
    fontWeight:'500'
  };
  
  const modalStyle = {
    background: 'white',   
    borderRadius: '10px 10px 10px 10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '32%',
  };
  
  

export default Modal;