import React, { useState } from 'react';
import SofaRowModal from './SofaRowModal';
import SofaSummaryRowModal from './SofaSummaryRowModal';
import TitleModal from './TittleModal';
import CustomButton from './CustomButton';
import LeftWrapper from './LeftWrapper';
import RightContainer from './RightContainer';
import pecas from '../data/DataMock'; // Importa o JSON do DataMock

const EditSofaModal = ({ isOpen, onClose, onSave, title }) => { // Recebe o título como prop
  const [leftItems, setLeftItems] = useState(pecas);
  const [rightItems, setRightItems] = useState([]);

  const handleFastForward = (item) => {
    setRightItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleDelete = (id) => {
    setRightItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Título */}
        <TitleModal
          modalName={title} // Exibe apenas o nome do sofá
          NameStyle={nameStyle}
          nameContainer={nameContainerStyle}
          isEditable={true}
          onClose={onClose}
        />

        {/* Conteúdo */}
        <div style={contentStyle}>
          <LeftWrapper>
            {leftItems.map((item, index) => (
              <SofaRowModal
                key={item.id}
                text={item.nome}
                quantity={item.quantidade}
                onDecrease={() =>
                  setLeftItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, quantidade: Math.max(Number(i.quantidade) - 1, 0) }
                        : i
                    )
                  )
                }
                onIncrease={() =>
                  setLeftItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, quantidade: Number(i.quantidade) + 1 }
                        : i
                    )
                  )
                }
                onFastForward={() => handleFastForward(item)}
                isEven={index % 2 === 0}
              />
            ))}
          </LeftWrapper>

          <RightContainer>
            <div style={summaryHeaderStyle}>Resumo</div>
            <div style={summaryContentStyle}>
              {rightItems.map((item) => (
                <SofaSummaryRowModal
                  key={item.id}
                  text={item.nome}
                  quantidade={item.quantidade}
                  isEditMode={true}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
            <div style={lineStyle}></div>
            <div style={footerStyle}>
              <CustomButton
                imageSrc="./assets/check.png"
                text="Salvar"
                buttonStyle={saveButtonStyle}
                imageStyle={iconFooterStyle}
                onClick={onSave}
                enableHover={true}
              />
            </div>
          </RightContainer>
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
  width: '70%',
  height: '72%',
  display: 'flex',
  flexDirection: 'column',
  padding: '0px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  alignItems: 'center',
  justifyContent: 'center',
};

const nameContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    background: '#0740DA',
    borderRadius: '10px 10px 0 0',
    width: '100%',
  };
  
  
  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Inter',
  
  };

const contentStyle = {
  display: 'flex',
  gap: '2%',
  overflow: 'hidden',
  height: '90%',
  width: '95%',
  alignItems: 'center',
  justifyContent: 'center',
};

const summaryHeaderStyle = {
  background: '#0740DA',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '5px',
  borderRadius: '10px 16px 0 0',
};

const summaryContentStyle = {
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
};

const lineStyle = {
  width: '100%',
  height: '3px',
  background: '#0740DA',
  marginTop: '8px',
};

const footerStyle = {
  display: 'flex',
  gap: '5%',
  padding: '12px',
  alignItems: 'center',
  justifyContent: 'center',
};

const saveButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  background: '#B8FFAA',
  border: 'none',
  borderRadius: '10px',
  padding: '8px 16px',
  cursor: 'pointer',
  color: '#16BC00',
  fontWeight: 'bold',
  width: '100%',
  justifyContent: 'center',
  height: '100%',
  transition: 'background 0.3s',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  outline: 'none',

};



const iconFooterStyle = {
  width: '25px',
  height: '25px',
};

export default EditSofaModal;