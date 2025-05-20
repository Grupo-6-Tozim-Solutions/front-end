import React from "react";
import "../styles/counchPageStyle.css";

const AddSofaCard = ({ onClick }) => {
  return (
    <div className="add-sofa-card" onClick={onClick} style={{
      border: "2px solid #e0e0e0",
      borderRadius: "16px",
      background: "#fafafa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      minHeight: "200px",
      minWidth: "200px",
      boxSizing: "border-box"
    }}>
      <span style={{ fontSize: 80, color: "#0057FF", lineHeight: 1 }}>+</span>
      <p style={{ marginTop: 16, fontWeight: 500, fontSize: 18, color: "#222" }}>Adicionar Novo Sofá</p>
    </div>
  );
};

export default AddSofaCard;
