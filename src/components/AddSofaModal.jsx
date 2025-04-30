import React, { useState, useRef } from 'react';
import SofaRowModal from './SofaRowModal';
import SofaSummaryRowModal from './SofaSummaryRowModal';
import TitleModal from './TittleModal';
import CustomButton from './CustomButton';
import LeftWrapper from './LeftWrapper';
import RightContainer from './RightContainer';
import pecas from '../data/DataMock'; // Importa o JSON do DataMock

const AddSofaModal = ({ isOpen, onClose, onSave }) => {
  const [leftItems, setLeftItems] = useState(pecas); // Usa o JSON do DataMock como estado inicial
  const [rightItems, setRightItems] = useState([]); // Dados dinâmicos para o RightContainer
  const [isImageSelected, setIsImageSelected] = useState(false); // Estado para rastrear se uma imagem foi selecionada
  const [sofaName, setSofaName] = useState("Novo Sofá"); // Estado para o nome do sofá

  const fileInputRef = useRef(null); // Referência para o input de arquivo

  const handleAddPhotoClick = () => {
    fileInputRef.current.click(); // Aciona o input de arquivo
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name); // Substitua por lógica para salvar ou exibir a imagem
      setIsImageSelected(true); // Atualiza o estado para indicar que uma imagem foi selecionada
    }
  };

  const handleFastForward = (item) => {
    // Adiciona o item ao RightContainer
    setRightItems((prev) => {
      // Evita duplicados no resumo
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleDelete = (id) => {
    // Remove o item do RightContainer
    setRightItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Título */}
        <TitleModal
          modalName={sofaName} // Passa o nome do sofá
          NameStyle={nameStyle}
          nameContainer={nameContainerStyle}
          isEditable={true}
          onClose={onClose}
          onNameChange={(newName) => setSofaName(newName)} // Atualiza o nome do sofá
        />

        {/* Conteúdo */}
        <div style={contentStyle}>
          {/* Lista esquerda */}
          <LeftWrapper>
            {leftItems.map((item, index) => (
              <SofaRowModal
                key={item.id}
                text={item.nome} // Usa a propriedade "nome" do DataMock
                quantity={item.quantidade || 0} // Garante que quantidade seja um número
                onDecrease={() =>
                  setLeftItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, quantidade: Math.max(Number(i.quantidade) - 1, 0) } // Garante que quantidade seja um número
                        : i
                    )
                  )
                }
                onIncrease={() =>
                  setLeftItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, quantidade: Number(i.quantidade) + 1 } // Garante que quantidade seja um número
                        : i
                    )
                  )
                }
                onFastForward={() => handleFastForward(item)}
                isEven={index % 2 === 0}
              />
            ))}
          </LeftWrapper>

          {/* Resumo à direita */}
          <RightContainer>
            <div style={summaryHeaderStyle}>Resumo</div>
            <div style={summaryContentStyle}>
              {rightItems.map((item) => (
                <SofaSummaryRowModal
                  key={item.id}
                  text={item.nome} // Usa a propriedade "nome" do DataMock
                  quantidade={Number(item.quantidade)} // Garante que quantidade seja um número
                  isEditMode={false}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
            <div style={lineStyle}></div>
            <div style={footerStyle}>
              {/* Botão de adicionar foto */}
              <CustomButton
                imageSrc={isImageSelected ? './assets/folderSave.png' : './assets/folder.png'}
                text="Adicionar foto"
                buttonStyle={{
                  ...addPhotoButtonStyle,
                  fontWeight: isImageSelected ? '600' : 'normal', // Define o texto em negrito se a imagem foi selecionada
                }}
                imageStyle={iconFooterStyle}
                onClick={handleAddPhotoClick}
              />
              {/* Input de arquivo oculto */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <CustomButton
                imageSrc="./assets/check.png"
                text="Salvar"
                buttonStyle={saveButtonStyle}
                imageStyle={iconFooterStyle}
                onClick={() => {
                  const newSofa = {
                    name: sofaName, // Usa o nome do sofá atualizado
                    image: "../../public/assets/generic-sofa.png", // Substitua por uma imagem selecionada, se necessário
                  };
                  onSave(newSofa); // Chama a função onSave com os dados do novo sofá
                }}
                enableHover={true} // Habilita o efeito de hover
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
  background: 'var(--primary-color)',
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
  background: 'var(--primary-color)',
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
  background: 'var(--primary-color)',
  marginTop: '8px',
};

const footerStyle = {
  display: 'flex',
  gap: '5%',
  padding: '12px',
  alignItems: 'center',
  justifyContent: 'center',
};

const addPhotoButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  background: '#E0E0E0',
  height: '35px',
  borderRadius: '5px',
  padding: '0px 15px',
  cursor: 'pointer',
  color: 'black',
};

const saveButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  background: '#B8FFAA',
  border: 'none',
  borderRadius: '5px',
  padding: '0px 16px',
  cursor: 'pointer',
  color: '#16BC00',
  fontWeight: 'bold',
  width: '38%',
  justifyContent: 'center',
  height: '100%',
  outline: 'none'
};

const iconFooterStyle = {
  width: '25px',
  height: '25px',
};

export default AddSofaModal;
