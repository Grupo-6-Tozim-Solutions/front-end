import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SofaSummaryRowModal = ({
  text,
  quantidade,
  isEditMode,
  onDelete,
  onQuantityChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleIncrease = () => {
    const newQty = quantidade + 1; // Modifique para usar a quantidade atual
    onQuantityChange(newQty);
  };

  const handleDecrease = () => {
    if (quantidade > 0) {
      const newQty = quantidade - 1; // Modifique para usar a quantidade atual
      onQuantityChange(newQty);
    }
  };

  const handleInputChange = (value) => {
    const newValue = Math.max(Number(value), 0);
    onQuantityChange(newValue);
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
          marginRight: "12%"
        }}
      >
        {isEditing ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleDecrease}
              color="error"
              sx={{ padding: "6px" }}
            >
              <RemoveIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => handleInputChange(e.target.value)}
              style={{
                width: "40px",
                height: "30px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                padding: 0,
                outline: "none",
              }}
            />
            <IconButton
              onClick={handleIncrease}
              color="primary"
              sx={{ padding: "6px" }}
            >
              <AddIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            x{String(quantidade || 0).padStart(2, "0")}
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
              sx={{ fontSize: "25px" }}
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
            sx={{ fontSize: "25px" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SofaSummaryRowModal;