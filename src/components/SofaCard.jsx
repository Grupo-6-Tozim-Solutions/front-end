import React, { useState } from "react";
import "../styles/counchPageStyle.css";

const SofaCard = ({ name, image }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const toggleState = () => {
    setIsSelected(!isSelected);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleEdit = () => {
    alert(`Editar ${name}`);
  };

  const handleDelete = () => {
    alert(`Excluir ${name}`);
  };

  const handleProduce = () => {
    alert(`Produzir ${quantity} unidades de ${name}`);
  };

  return (
    <div
      onClick={toggleState}
      className={`sofa-card ${isSelected ? "selected" : ""}`}
    >
      {!isSelected ? (
        <>
          <label
            className="custom-checkbox"
            onClick={(e) => e.stopPropagation()} // Evita que o clique na checkbox altere o estado do card
          >
            <input type="checkbox" readOnly />
            <span className="checkmark"></span>
          </label>
          <img src={image} alt={name} className="sofa-image" />
          <p className="sofa-name">{name}</p>
        </>
      ) : (
        <div className="sofa-selected">
          <button
              className="produce-button proportional-button"
              onClick={(e) => {
                e.stopPropagation();
                handleProduce();
              }}
            >
              <img src="../../public/assets/filterPartsStorage.png" alt="Produzir" />
              Produzir!
            </button>
          <div className="quantity-controls">
            <button
              className="decrement-button"
              onClick={(e) => {
                e.stopPropagation();
                decrementQuantity();
              }}
            >
              ⬇
            </button>
            <span>{quantity}</span>
            <button
              className="increment-button"
              onClick={(e) => {
                e.stopPropagation();
                incrementQuantity();
              }}
            >
              ⬆
            </button>
          </div>
          <div className="action-buttons">
            
            <button
              className="edit-button proportional-button"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              ✏️ Editar
            </button>
            <button
              className="delete-button proportional-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <img src="../../public/assets/trashCanPartsStorage.png" alt="Excluir" />
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SofaCard;
