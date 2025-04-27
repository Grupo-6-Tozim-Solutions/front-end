import React, { useState } from 'react';
import ArrowButton from './ArrowButton';
import './SofaRowModal.css'; // Importando o CSS

const SofaRowModal = ({ text, quantity: initialQuantity, onDecrease, onIncrease, onFastForward, isEven }) => {
  const [quantity, setQuantity] = useState(initialQuantity); // Estado local para controlar a quantidade
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre visualização e edição

  const backgroundColor = isEven ? '#D9D9D9' : '#F0F0F0';

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1); // Incrementa a quantidade localmente
    if (onIncrease) onIncrease(); // Chama a função de incremento, se fornecida
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1); // Decrementa a quantidade localmente
      if (onDecrease) onDecrease(); // Chama a função de decremento, se fornecida
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setQuantity(value); // Atualiza a quantidade com o valor digitado
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); // Alterna entre os modos de edição e visualização
  };

  return (
    <div className="sofa-row" style={{ backgroundColor }}>
      <div className="container-left">
        <span className="text-style" name="row-text">{text}</span>
        <div className="container-buttons-style">
          <div className="container-buttons-operation">
            <ArrowButton
              iconSrc="./assets/DownArrow.png"
              altText="Diminuir"
              onClick={handleDecrease}
              name="decrease-button"
              backgroundColor="#FFC9C9"
              styleImage={{ width: '12px', height: '12px' }}
            />
            {isEditing ? (
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={toggleEditMode} // Sai do modo de edição ao perder o foco
                className="quantity-input"
              />
            ) : (
              <span
                className="quantity-style"
                name="quantity"
                onClick={toggleEditMode} // Entra no modo de edição ao clicar
                style={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                {quantity}
              </span>
            )}
            <ArrowButton
              iconSrc="./assets/upArrow.png"
              altText="Aumentar"
              onClick={handleIncrease}
              name="increase-button"
              backgroundColor="#A5D7FF"
              styleImage={{ width: '20px', height: '12px' }}
            />
          </div>
          <button
            className="fast-forward-button"
            name="fast-forward-button"
            onClick={onFastForward}
          >
            <img
              src="./assets/fastForward.png"
              alt="Avançar"
              className="icon-style"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SofaRowModal;