import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SofaSummaryRowModal = ({
  text,
  quantidade: initialQuantidade,
  isEditMode,
  onEdit,
  onDelete,
  onIncrease,
  onDecrease,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantidade, setQuantidade] = useState(Number(initialQuantidade) || 0);

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 10px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#F5F5F5",
        width: "100%",
      }}
    >
      {/* Text Section */}
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

      {/* Quantity Section */}
      <Box
        sx={{
          flex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isEditing ? (
          <Box sx={{ display: "flex", alignItems: "center", }}>
            <IconButton
              onClick={handleDecrease}
              color="error"
            >
              <RemoveIcon/>
            </IconButton>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value) || 0)}
              className="quantity-input"
              style={{
                width: "40px",
                height: "30px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                padding: 0,
                outline: "none",
                appearance: "none",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
            />
            {/* Remove spinner arrows */}
            <style>
              {`
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                input[type="number"] {
                  -moz-appearance: textfield;
                }
              `}
            </style>
            <IconButton
              onClick={handleIncrease}
              color="primary"
            >
              <AddIcon/>
            </IconButton>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            x{String(quantidade || 0)}
          </Typography>
        )}
      </Box>

      {/* Actions Section */}
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
              backgroundColor: "#A5D7FF",
              borderRadius: "4px",
              "&:hover": { backgroundColor: "#80C6FF" },
              width: "30px",
              height: "32px",
            }}
          >
            <EditIcon
            color="primary"
              sx={{
                fontSize: "25px",
                
              }}
             />
          </IconButton>
        )}
        <IconButton
          onClick={onDelete}
          sx={{
            backgroundColor: "#FFC9C9",
            "&:hover": { backgroundColor: "#FFAAAA" },
            width: "30px",
            height: "32px",
            borderRadius: "4px",
          }}
        >
          <DeleteIcon
            color="error"
            sx={{
              fontSize: "25px",
              
            }}
           />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SofaSummaryRowModal;