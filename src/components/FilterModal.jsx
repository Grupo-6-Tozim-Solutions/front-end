import React from 'react';
import CustomButton from './CustomButton';

const FilterModal = ({ isOpen, onClose, onApply }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={nameContainer}>
                    <span style={NameStyle}>Filtros</span>
                    <button style={buttonExitStyle} onClick={onClose}>
                        <img
                            src="public/assets/btnClose.png"
                            alt="btnClose"
                            style={{ width: '15px', height: '15px', padding: '0px' }}
                        />
                    </button>
                </div>
                <div style={containerModal}>
                    <span style={{ fontWeight: '600', color: 'black', marginRight: '240px', display: 'flex' }}>
                        Filtrar por:
                    </span>
                    <label style={labelStyle}>
                        <img style={{ width: '2vw', height: '3.5vh', marginTop: '3px' }} src="./assets/lupa.png" alt="" />
                        <input style={inputStyle} type="text" placeholder='Filtrar por nome' />
                        <div style={buttonContainerStyle}>
                            <CustomButton
                                imageSrc="./assets/imagePlus.png"
                                imageStyle={imageButtonPlus}
                                text="Aplicar"
                                buttonStyle={btnAddStyle}
                                onClick={onApply}
                            />
                        </div>
                    </label>
                    <div style={containerFilter}>
                        <label style={checkboxLabelStyle}>
                            <input type="checkbox" style={checkboxStyle} />
                            <span style={checkboxTextStyle}>Maior Número de peças</span>
                        </label>
                        <label style={checkboxLabelStyle}>
                            <input type="checkbox" style={checkboxStyle} />
                            <span style={checkboxTextStyle}>Menor Número de peças</span>
                        </label>
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

const modalStyle = {
    background: 'white',
    borderRadius: '10px',
    width: '45vw',
    height: '37vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
};

const containerModal = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center'

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


const NameStyle = {
    fontSize: '13px',
    fontWeight: 'Bold',
    fotFamily: 'Inter',
    color: 'white',
    display: 'flex',
    marginLeft: '21vw',
    flex: '1',
}

const inputStyle = {
    height: '3vh',
    borderRadius: '3px',
    border: '1.3px solid black',
    marginTop: '3px'
}

const labelStyle = {
    display: 'flex',
    gap: '10px',
    width: '50%',
    marginRight: '90px'
}


const buttonContainerStyle = {
    display: 'flex',
    marginLeft: '20px',

};

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

const containerFilter = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    fontWeight: 'regular'

}



const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
  };
  
  const checkboxStyle = {
    appearance: 'none', // Remove o estilo padrão do checkbox
    width: '16px',
    height: '16px',
    borderRadius: '50%', // Torna o checkbox redondo
    border: '2px solid #0740DA',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'inline-block',
    position: 'relative',
  };
  
  const checkboxTextStyle = {
    fontSize: '11px',
    fontWeight: '400',
  };

export default FilterModal;