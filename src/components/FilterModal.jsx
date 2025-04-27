import React, { useState } from 'react';
import CustomButton from './CustomButton';
import TitleModal from './TittleModal';

const FilterModal = ({ isOpen, onClose, onApply, onFilter }) => {
    const [filterName, setFilterName] = useState('');
    const [filterByLargest, setFilterByLargest] = useState(false);
    const [filterBySmallest, setFilterBySmallest] = useState(false);

    const handleApplyFilter = () => {
        // Define os critérios de filtro
        const criteria = {
            name: filterName,
            order: filterByLargest ? 'largest' : filterBySmallest ? 'smallest' : null,
        };

        // Envia os critérios de filtro para o componente pai
        onFilter(criteria);
        onApply(); // Fecha o modal
    };

    const handleCheckboxChange = (type) => {
        if (type === 'largest') {
            setFilterByLargest(!filterByLargest);
            setFilterBySmallest(false); // Desativa o outro filtro
        } else if (type === 'smallest') {
            setFilterBySmallest(!filterBySmallest);
            setFilterByLargest(false); // Desativa o outro filtro
        }
    };

    if (!isOpen) return null;

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <TitleModal
                    modalName="Filtros"
                    NameStyle={NameStyle}
                    nameContainer={nameContainer}
                    onClose={onClose}
                />
                <div style={containerModal}>
                    <span
                        style={{
                            fontWeight: '600',
                            color: 'black',
                            marginRight: '240px',
                            display: 'flex',
                            fontSize: '20px',
                        }}
                    >
                        Filtrar por:
                    </span>
                    <label style={labelStyle}>
                        <img
                            style={{ width: '2vw', height: '3.5vh', marginTop: '3px' }}
                            src="./assets/lupa.png"
                            alt=""
                        />
                        <input
                            style={inputStyle}
                            type="text"
                            placeholder="Filtrar por nome"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                        <div style={buttonContainerStyle}>
                            <CustomButton
                                imageSrc="./assets/imagePlus.png"
                                imageStyle={imageButtonPlus}
                                text="Aplicar"
                                buttonStyle={btnAddStyle}
                                onClick={handleApplyFilter}
                            />
                        </div>
                    </label>
                    <div style={containerFilter}>
                        <label style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                style={{
                                    ...checkboxStyle,
                                    ...(filterByLargest ? checkboxCheckedStyle : {}),
                                }}
                                checked={filterByLargest}
                                onChange={() => handleCheckboxChange('largest')}
                            />
                            <span style={checkboxTextStyle}>Maior Número de peças</span>
                        </label>
                        <label style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                style={{
                                    ...checkboxStyle,
                                    ...(filterBySmallest ? checkboxCheckedStyle : {}),
                                }}
                                checked={filterBySmallest}
                                onChange={() => handleCheckboxChange('smallest')}
                            />
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
    width: '41vw',
    height: '32vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const containerModal = {
    width: '75%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginTop: '2%',
};

const nameContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%',
    height: '8vh',
    background: '#0740DA',
    borderRadius: '10px 10px 0px 0px',
};

const NameStyle = {
    fontSize: '15px',
    fontWeight: 'Bold',
    fotFamily: 'Inter',
    color: 'white',
    display: 'flex',
    marginLeft: '15.5vw',
    flex: '1',
};

const inputStyle = {
    height: '3.5vh',
    borderRadius: '6px',
    border: '2px solid black',
    marginTop: '3px',
    width: '55%',
};

const labelStyle = {
    display: 'flex',
    gap: '10px',
    width: '100%',
    marginRight: '90px',
};

const buttonContainerStyle = {
    display: 'flex',
    marginLeft: '20px',
};

const imageButtonPlus = {
    display: 'flex',
    width: '15px',
    height: '16px',
    marginRight: '7px',
};

const btnAddStyle = {
    backgroundColor: '#C9E7FF',
    color: '#0740DA',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 22px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};

const containerFilter = {
    display: 'flex',
    gap: '13%',
    alignItems: 'center',
    fontWeight: 'regular',
};

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

const checkboxCheckedStyle = {
    backgroundColor: '#0740DA',
  };



const checkboxTextStyle = {
    fontSize: '15px',
    fontWeight: '400',
};

export default FilterModal;