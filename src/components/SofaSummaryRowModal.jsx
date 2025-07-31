import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SofaSummaryRowModal = ({
  text,
  quantidade,
  tipo,
  pecaId,
  isEditMode,
  onDelete,
  onQuantityChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantidade);
  const [isDeleting, setIsDeleting] = useState(false);

  let unidade = "";
  if (tipo === "ESPUMA") unidade = "m";
  else if (tipo === "TECIDO") unidade = "kg";
  // Sincroniza o estado local quando a prop quantidade muda

  useEffect(() => {
    console.log('SofaSummaryRowModal recebeu:', { pecaId, quantidade });
  }, [pecaId, quantidade]);

  useEffect(() => {
    setLocalQuantity(quantidade);
  }, [quantidade]);

  const handleEditClick = () => {
    if (isEditing && onQuantityChange) {
      onQuantityChange(localQuantity); // Salva ao sair do modo edição
    }
    setIsEditing(!isEditing);
  };

  const handleIncrease = () => {
    const newQty = localQuantity + 1;
    updateQuantity(newQty);
  };

  const handleDecrease = () => {
    if (localQuantity > 1) { // Mínimo de 1 peça
      const newQty = localQuantity - 1;
      updateQuantity(newQty);
    }
  };

  const updateQuantity = (newQuantity) => {
    setLocalQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    let value = Number(e.target.value);
    if (tipo === "PECA") {
      value = Math.max(Math.floor(value), 1); // mínimo 1 inteiro
    } else {
      value = value > 0 ? value : 0.01; // mínimo 0.01 decimal
    }
    setLocalQuantity(value);
  };

  const handleBlur = () => {
    if (onQuantityChange) {
      onQuantityChange(localQuantity);
    }
  };

  const handleDeleteClick = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 10px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#F5F5F5",
        width: "100%",
        transition: "background-color 0.3s",
        '&:hover': {
          backgroundColor: "#EBEBEB"
        }
      }}
    >
      {/* Nome da Peça */}
      <Typography
        sx={{
          flex: 2,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          textAlign: "left",
          paddingLeft: "10px",
          fontSize: "16px",
        }}
      >
        {text}
      </Typography>

      {/* Controle de Quantidade */}
      <Box
        sx={{
          flex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "12%"
        }}
      >
        {isEditing ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <IconButton onClick={handleDecrease} color="error" sx={{ padding: "6px", '&:disabled': { opacity: 0.5 } }} disabled={localQuantity <= 1}>
              <RemoveIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <input
              type="number"
              value={localQuantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
              min={tipo === "PECA" ? "1" : "0.01"}
              step={tipo === "PECA" ? "1" : "0.01"}
              style={{
                width: "60px",
                height: "32px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "0 5px",
                outline: "none",
                backgroundColor: "white",
              }}
            />
            <span style={{ marginLeft: 4 }}>{unidade}</span>
            <IconButton onClick={handleIncrease} color="primary" sx={{ padding: "6px" }}>
              <AddIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              minWidth: "40px",
              textAlign: "center"
            }}
          >
            {tipo === "PECA"
              ? `x${String(Math.round(localQuantity)).padStart(2, "0")}`
              : `${Number(localQuantity).toFixed(2)} ${unidade}`}
          </Typography>
        )}
      </Box>

      {/* Botões de Ação */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {isEditMode && (
          <IconButton
            onClick={handleEditClick}
            sx={{
              backgroundColor: isEditing ? "#1976d2" : "#A5D7FF",
              color: isEditing ? "white" : "inherit",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: isEditing ? "#1565c0" : "#80C6FF"
              },
              width: "32px",
              height: "32px",
              transition: "all 0.3s"
            }}
            disabled={isDeleting}
          >
            <EditIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        )}

        <IconButton
          onClick={handleDeleteClick}
          sx={{
            backgroundColor: "#FFC9C9",
            "&:hover": { backgroundColor: "#FFAAAA" },
            width: "32px",
            height: "32px",
            borderRadius: "4px",
            transition: "all 0.3s"
          }}
          disabled={isDeleting}
        >
          <DeleteIcon
            color="error"
            sx={{ fontSize: "20px" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SofaSummaryRowModal;