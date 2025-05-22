import React from "react";
import "../styles/counchPageStyle.css";

const AddSofaCard = ({ onClick }) => {
  return (
    <div className="add-sofa-card" onClick={onClick}>
      <span className="add-sofa-plus">+</span>
      <p style={{ marginTop: 16, fontWeight: 500, fontSize: 18, color: "#222" }}>Adicionar Novo Sofá</p>
    </div>
  );
};

export default AddSofaCard;
