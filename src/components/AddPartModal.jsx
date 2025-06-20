import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CustomButton from "./CustomButton";
import TitleModal from "./TittleModal";

const AddPartModal = ({ isOpen, onClose, onSave, onError }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("");
  const [tipo, setTipo] = useState("PECA");

  const handleSave = () => {
    if (!name) {
      onError?.("O nome da peça não pode estar vazio");
      return;
    }

    if (name.length > 40) {
      onError?.("O nome da peça não pode ter mais de 40 caracteres");
      return;
    }

    if (name.length < 3) {
      onError?.("O nome da peça não pode ter menos de 3 caracteres");
      return;
    }

    if (!quantity) {
      onError?.("A quantidade inicial de estoque não pode estar vazia");
      return;
    }
    if (!lowStockThreshold) {
      onError?.("A quantidade de alerta não pode estar vazia");
      return;
    }

    const newPart = {
      nome: name,
      quantidadeEstoque: parseFloat(quantity),
      quantidadeMinima: parseFloat(lowStockThreshold),
      tipo: tipo,
    };
    console.log("Enviando peça:", newPart);
    onSave(newPart);
    onClose(); // Fecha o modal após salvar
  };

  const handleClose = () => {
    setName("");
    setQuantity("");
    setLowStockThreshold("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "60%", md: "45%" },
          bgcolor: "#F0F0F0",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <TitleModal modalName="Adicionar nova peça" onClose={handleClose} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid #ccc",
            borderRadius: "12px",
            margin: { xs: "10px", sm: "20px" },
            backgroundColor: "#FFFFFF",
            width: { xs: "95%", sm: "80%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              width: "100%",
              ml: { xs: "0", sm: "10px" },
              padding: { xs: "10px", sm: "20px" },
            }}
          >
            {/* Inputs */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: "400" }}>
                Adicionar nome:
              </Typography>
              <TextField
                placeholder="Nome da peça"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                fullWidth
                sx={{
                  width: { xs: "100%", sm: "69%" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
            </Box>


            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: "400" }}>
                Tipo de peça:
              </Typography>
              <FormControl
                size="small"
                variant="outlined"
                sx={{
                  minWidth: 223,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              >
                <Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  variant="outlined"
                  displayEmpty
                  sx={{
                    background: "#fff",
                  }}
                >
                  <MenuItem value="PECA">Peça (unidade)</MenuItem>
                  <MenuItem value="ESPUMA">Espuma (metro)</MenuItem>
                  <MenuItem value="TECIDO">Tecido (kg)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: "400" }}>
                Adicionar quantidade inicial:
              </Typography>
              <TextField
                type="number"
                step="any"
                placeholder="00"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                size="small"
                sx={{
                  width: "115px",
                  "& .MuiOutlinedInput-root": {
                    height: "35px",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  "& input": {
                    appearance: "textfield",
                    textAlign: "center",
                  },
                }}
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: "400" }}>
                Configurar alerta de estoque baixo:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TextField
                  type="number"
                  placeholder="00"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                  size="small"
                  sx={{
                    width: "61px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "35px",
                      "& fieldset": {
                        borderColor: "black",
                      },
                    },
                    "& input": {
                      appearance: "textfield",
                      textAlign: "center",
                    },
                  }}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
                <Typography
                  sx={{
                    bgcolor: "#FFC9C9",
                    color: "#FF0D0D",
                    padding: "10px 25px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  Estoque baixo
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <CustomButton
                imageSrc="./assets/imagePlus.png"
                text="Adicionar"
                buttonStyle={{
                  backgroundColor: "#C9E7FF",
                  color: "#0740DA",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#B0D8FF",
                  },
                }}
                imageStyle={{
                  width: "20px",
                  height: "20px",
                }}
                onClick={handleSave}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPartModal;
