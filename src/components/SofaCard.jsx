import React, { useState } from "react";
import "../styles/counchPageStyle.css";

const SofaCard = ({ name, image, onEdit, onDelete }) => { // Adicione "onDelete" como prop
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const toggleState = () => {
    setIsSelected(!isSelected);
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
              alert(`Produzir ${quantity} unidades de ${name}`);
            }}
          >
            ({quantity}) Produzir!
          </button>
          <div className="quantity-controls">
            <button
              className="decrement-button"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((prev) => Math.max(prev - 1, 0));
              }}
            >
              <img src="../../public/assets/decrement.svg" alt="" />
            </button>
            <span>{quantity}</span>
            <button
              className="increment-button"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((prev) => prev + 1);
              }}
            >
              <img src="../../public/assets/increment.svg" alt="" />
            </button>
          </div>
          <div className="action-buttons">
            <button
              className="edit-button proportional-button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(); // Chama a função de edição passada como prop
              }}
            >
              <img src="../../public/assets/lapisIcone.png" alt="Editar" /> Editar
            </button>
            <button
              className="delete-button proportional-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(); // Chama a função de exclusão passada como prop
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