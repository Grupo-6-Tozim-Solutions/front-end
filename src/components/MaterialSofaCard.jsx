import React, { useState } from "react";
import { Card, CardContent, Typography, Button, IconButton, Box, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MaterialSofaCard = ({ name, image, onEdit, onDelete }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);
  // const [isChecked, setIsChecked] = useState(false);

  const toggleState = (e) => {
    if (e.target.type !== "checkbox") {
      setIsSelected(!isSelected);
    }
  };

  // const handleCheckboxChange = (e) => {
  //   e.stopPropagation(); // Prevents the card's state from toggling
  //   setIsChecked(e.target.checked);
  // };

  return (
    <Card
      onClick={toggleState}
      sx={{
        width: "100%",
        borderRadius: "8px",
        boxShadow: isSelected ? "0 0 10px rgba(0, 0, 0, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        overflow: "hidden",
        height: "240px",
        "&:hover .hover-image": {
          filter: "brightness(54%)", // Darken the image on hover
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "75%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isSelected ? "#f8f8f8" : "transparent",
          position: "relative", // Ensure proper positioning for the checkbox
        }}
      >
  
        {!isSelected ? (
          <Box
            component="img"
            src={image}
            alt={name}
            className="hover-image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "filter 0.3s ease",
              filter: "brightness(80%)",
            }}
          />
        ) : (
          <CardContent sx={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Produzir ${quantity} unidades de ${name}`);
              }}
              sx={{ width: "170%" }}
            >
              ({quantity}) Produzir!
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((prev) => Math.max(prev - 1, 0));
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{quantity}</Typography>
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((prev) => prev + 1);
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "170%" }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                Excluir
              </Button>
            </Box>
          </CardContent>
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" component="div" textAlign="center">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MaterialSofaCard;
