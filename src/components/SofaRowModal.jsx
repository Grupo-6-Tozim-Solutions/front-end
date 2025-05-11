import React, { useState } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FastForwardIcon from "@mui/icons-material/FastForward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SofaRowModal = ({
  text,
  quantity: initialQuantity,
  onDecrease,
  onIncrease,
  onFastForward,
  isEven,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isEditing, setIsEditing] = useState(false);

  const backgroundColor = isEven ? "#EBEBEB" : "#F8F8F8";

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    if (onIncrease) onIncrease();
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      if (onDecrease) onDecrease();
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "14px",
        width: "100%",
        borderRadius: "7px",
        backgroundColor,
        padding: "12px 16px",
        height: "50px",
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          textAlign: "left",
          width: "25%", // Adjust width as needed
        }}
      >
        {text}
      </Box>

      {/* Quantity Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
           // Adjust width as needed
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={handleDecrease}
            color="error"
            sx={{
                          }}
          >
            <RemoveIcon />
          </IconButton>
          {isEditing ? (
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={toggleEditMode}
              size="small"
              sx={{
                width: "60px",
                "& input": { textAlign: "center", fontWeight: "bold" },
              }}
            />
          ) : (
            <Typography
              onClick={toggleEditMode}
              sx={{
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {quantity}
            </Typography>
          )}
          <IconButton
            onClick={handleIncrease}
            color="primary"
                      >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Fast Forward Button */}
      <Button
        onClick={onFastForward}
        variant="contained"
        sx={{
          backgroundColor: "#B8FFAA",
          "&:hover": { backgroundColor: "#52B788" },
          color: "white",
          fontWeight: "bold",
          padding: "6px 16px",
          flexShrink:0,
          textTransform: "none",
        }}
      >
        <FastForwardIcon />
      </Button>
    </Box>
  );
};

export default SofaRowModal;