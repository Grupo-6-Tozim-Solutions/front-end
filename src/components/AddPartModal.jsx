import React from 'react';// Certifique-se de que o caminho está correto
import CustomButton from './CustomButton';

const AddPartModal = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const handleSave = () => {
        onSave();
        onClose();
    };


    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={nameContainer}>
                    <span style={NameStyle}>Adicionar nova Peça</span>
                    <button style={buttonExitStyle} onClick={onClose}>
                        <img
                            src="public/assets/btnClose.png"
                            alt="btnClose"
                            style={{ width: '15px', height: '15px', padding: '0px' }}
                        />
                    </button>
                </div>
                <div style={containerModal}>
                    <label style={labelStyle}>
                        <span style={{ marginTop: '5px' }}> Adicionar nome:</span>
                        <input type="text" style={inputNameStyle} placeholder="Nome da peça" />
                    </label>
                    <label style={labelStyle}>
                        <span style={{ marginTop: '7px' }}> Adicionar Quantidade Inicial:</span>
                        <input type="number" style={inputQtdStyle} placeholder="00" />
                    </label>
                    <div style={{ width: '100%' }}>
                        <img src="./assets/Line.png" alt="" style={{ width: '96%', height: '0.8px', margin: '0', display: 'block' }} />
                    </div>
                    <span style={textConfigStyle}>
                        Configurar alerta de estoque baixo
                    </span>
                    <label style={labelInputStyle}>
                        <input style={inputQtdStyle} type="text" placeholder='00' />
                        <span style={textLowStock}>Estoque baixo</span>
                    </label>
                    <span style={{ fontSize: '11.5px', color:'black', fontStyle: 'italic', marginTop: '10px', textAlign: 'left' }}>
                        Quando seu estoque chegar na quantidade indicada, enviaremos um alerta
                    </span>
                    <div style={boxBtn}>
                        <CustomButton
                            imageSrc="./assets/imagePlus.png"
                            imageStyle={imageButtonPlus}
                            text="Adicionar"
                            buttonStyle={btnAddStyle}
                            onClick={() => console.log('Adicionar clicado')}
                        />
                    </div>
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

const containerModal = {
    width: '65%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

}

const nameContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%',
    height: '7vh',
    background: '#0740DA',
    borderRadius: '10px 10px 0px 0px',

};

const buttonExitStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',

};

const modalStyle = {
    background: 'white',
    borderRadius: '10px',
    width: '50vw',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '65vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const NameStyle = {
    fontSize: '13px',
    fontWeight: 'Bold',
    fotFamily: 'Inter',
    color: 'white',
    display: 'flex',
    marginLeft: '19vw',
    flex: '1',
}

const labelStyle = {
    display: 'flex',
    gap: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
};


const inputNameStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
    width: '180px',
    height: '6px',
}

const inputQtdStyle = {

    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
    width: '29px',
    height: '25px',
};

const textConfigStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'left', // Alinha o texto à esquerda
    marginTop: '10px', // Adiciona espaçamento superior
};

const labelInputStyle = {
    display: 'flex',
    gap: '5px'
}

const textLowStock = {
    backgroundColor: '#FFC9C9',
    color: '#FF0D0D',
    padding: '0px 7px 0px 7px',
    height: '28px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Inter',
    marginTop: '5px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const boxBtn = {
    display:'flex',
    marginLeft:'93%',
    marginTop:'2px',
}

const imageButtonPlus = {
    display: 'flex',
    width: '13px',
    height: '13px',
    marginRight: '7px',
};


const btnAddStyle = {
    backgroundColor: '#C9E7FF',
    color: '#0740DA',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};


export default AddPartModal;