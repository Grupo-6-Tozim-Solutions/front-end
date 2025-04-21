import React from "react";
import "../styles/counchPageStyle.css";

const SofaCard = ({ name, image }) => {
  return (
    <div style={{
      width: '99%',
      backgroundColor: '#D9D9D9',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      height: '85%',
    }}>
      {/* <input
        type="checkbox"
        className="imput-card"
      /> */}

<label className="custom-checkbox">
   <input type="checkbox"></input>
    <span className="checkmark"></span>
</label>

      <img src={image} alt={name} style={{ width: '75%',  height: 'auto'}} />
      <p style={{ marginTop: '8px', fontWeight: 'bold' }}>{name}</p>
    </div>
  );
};

export default SofaCard;
