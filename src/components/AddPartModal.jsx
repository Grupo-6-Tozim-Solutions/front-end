import React from 'react';
import CustomButton from './CustomButton';
import TitleModal from './TittleModal';

const AddPartModal = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const handleSave = () => {
        onSave();
        onClose();
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <TitleModal
                    modalName="Adicionar nova peça"
                    NameStyle={NameStyle}
                    onClose={onClose}
                    nameContainer={nameContainer} 
                />
                <div style={containerModal}>
                    <label style={labelStyle}>
                        <span>Adicionar nome:</span>
                        <input type="text" style={inputNameStyle} placeholder="Nome da peça" />
                    </label>
                    <label style={labelStyle}>
                        <span>Adicionar quantidade inicial:</span>
                        <input type="number" style={inputQtdStyle} placeholder="00" />
                    </label>
                    <div style={{ width: '100%' }}>
                        <img src="./assets/Line.png" alt="" style={lineStyle} />
                    </div>
                    <span style={textConfigStyle}>
                        Configurar alerta de estoque baixo
                    </span>
                    <label style={labelInputStyle}>
                        <input style={inputQtdStyle} type="text" placeholder='00' />
                        <span style={textLowStock}>Estoque baixo</span>
                    </label>
                    <span style={alertInfoStyle}>
                        Quando seu estoque chegar na quantidade indicada, enviaremos um alerta
                    </span>
                </div>
                <div style={boxBtn}>
                    <CustomButton
                        imageSrc="./assets/imagePlus.png"
                        imageStyle={imageButtonPlus}
                        text="Adicionar"
                        buttonStyle={btnAddStyle}
                        onClick={handleSave}
                    />
                </div>
            </div>
        </div>
    );
};

// Estilos
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

const modalStyle = {
    background: 'white',
    borderRadius: '10px',
    width: '45vw',
    height: '55vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const nameContainer = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '7vh',
    background: '#0740DA',
    borderRadius: '10px 10px 0px 0px',
    justifyContent: 'center'
};

const NameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    flex: '1',
    marginLeft:'9%'
};


const containerModal = {
    width: '65%',
    height: '55%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingTop: '20px',
};

const labelStyle = {
    display: 'flex',
    gap: '10px',
    fontSize: '17px',
    fontWeight: 'bold',
    alignItems: 'center',

};

const inputNameStyle = {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '2px solid black',
    width: '59%',
    fontSize: '14px',
};

const inputQtdStyle = {
    borderRadius: '5px',
    border: '2px solid black',
    padding: '6px',
    width: '30px',
    fontSize: '14px',
};

const lineStyle = {
    width: '96%',
    height: '1.2px',
    margin: '8px 0',
    display: 'block',
};

const textConfigStyle = {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '4px',
    marginRight: ' 36%',
};

const labelInputStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
};

const textLowStock = {
    backgroundColor: '#FFC9C9',
    color: '#FF0D0D',
    padding: '2px 10px',
    height: '28px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'Inter',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const alertInfoStyle = {
    fontSize: '13px',
    color: 'black',
    fontStyle: 'italic',
    marginTop: '5px',
    textAlign: 'left',
};

const boxBtn = {
    display: 'flex',
    marginLeft: '75%',
    marginTop: '60px',
};

const imageButtonPlus = {
    width: '20px',
    height: '20px',
    marginRight: '6px',
};

const btnAddStyle = {
    backgroundColor: '#C9E7FF',
    color: '#0740DA',
};



export default AddPartModal;
