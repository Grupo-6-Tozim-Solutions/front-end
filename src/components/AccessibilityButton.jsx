import React, { useEffect } from "react";

const AccessibilityButton = () => {
  useEffect(() => {
    // Inicialize a API de acessibilidade aqui, se necessário
    const ht = new window.HT({
      token: "SEU_TOKEN_AQUI", // Substitua pelo token fornecido pela API
    });
  }, []);

  const handleToggleAccessibility = () => {
    // Lógica para ativar/desativar a funcionalidade de acessibilidade
    alert("Acessibilidade ativada!");
  };

  return (
    <button
      onClick={handleToggleAccessibility}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "var(--primary-color)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        cursor: "pointer",
        fontSize: "24px",
      }}
    >
      🖐️
    </button>
  );
};

export default AccessibilityButton;