import React from "react";
import "../styles/counchPageStyle.css";

const AddSofaCard = ({ onClick, sx }) => {
  return (
    <div
      className="add-sofa-card"
      onClick={onClick}
      style={{
        minHeight: 220,
        minWidth: 300,
        maxWidth: 340,
        maxHeight: 260,
        height: 220,
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #e0e0e0",
        borderRadius: "16px",
        background: "#fafafa",
        cursor: "pointer",
        boxSizing: "border-box",
        ...sx,
      }}
    >
      <span className="add-sofa-plus">+</span>
      <p
        style={{
          marginTop: 16,
          fontWeight: 500,
          fontSize: 18,
          color: "#222",
        }}
      >
        Adicionar Novo Sofá
      </p>
    </div>
  );
};

export default AddSofaCard;
