import React, { useState } from 'react';
import ArrowButton from './ArrowButton';
import './SofaSummaryRowModal.css';

const SofaSummaryRowModal = ({ text, quantidade: initialQuantidade, isEditMode, onEdit, onDelete, onIncrease, onDecrease }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantidade, setQuantidade] = useState(Number(initialQuantidade) || 0); // Garante que seja um número válido

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleIncrease = () => {
    setQuantidade((prev) => prev + 1);
    if (onIncrease) onIncrease();
  };

  const handleDecrease = () => {
    if (quantidade > 0) {
      setQuantidade((prev) => prev - 1);
      if (onDecrease) onDecrease();
    }
  };

  return (
    <div className="summary-item">
      <div className="summary-text">{text}</div>
      <div className="summary-quantity">
        {isEditing ? (
          <div className="edit-actions">
            <ArrowButton
              iconSrc="./assets/DownArrow.png"
              altText="Diminuir"
              onClick={handleDecrease}
              backgroundColor="#FFC9C9"
              buttonStyle={{ padding: '6px 8px 6px 6px', width: '25px', height: '25px' }}
              imageStyle={{ width: '12px', height: '12px' }}
            />
            <input
              type="number"
              value={quantidade || 0} // Garante que o valor seja um número válido
              onChange={(e) => setQuantidade(Number(e.target.value) || 0)} // Converte para número
              className="quantity-input"
            />
            <ArrowButton
              iconSrc="./assets/upArrow.png"
              altText="Aumentar"
              onClick={handleIncrease}
              backgroundColor="#A5D7FF"
              buttonStyle={{ padding: '6px 8px 6px 6px', width: '25px', height: '25px' }}
              imageStyle={{ width: '12px', height: '12px' }}
            />
          </div>
        ) : (
          <span className="quantity-text">x{String(quantidade || 0)}</span> // Converte para string ao exibir
        )}
      </div>
      <div className="summary-actions">
        {isEditMode && (
          <button className="icon-button-edit" onClick={handleEditClick}>
            <img src="./assets/pencilPartsStorage.png" alt="Editar" className="icon-image" />
          </button>
        )}
        <button className="icon-button-delete" onClick={onDelete}>
          <img src="./assets/trashCanImage.png" alt="Excluir" className="icon-image" />
        </button>
      </div>
    </div>
  );
};

export default SofaSummaryRowModal;