import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const EditPartModal = ({ isOpen, onClose, partData, onSave }) => {
  if (!isOpen || !partData) return null;

  const [initialQuantity, setInitialQuantity] = useState(0);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const [removedQuantity, setRemovedQuantity] = useState(0);
  const [addInputValue, setAddInputValue] = useState("");
  const [removeInputValue, setRemoveInputValue] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(partData.nome);

  useEffect(() => {
    if (partData && partData.quantidade !== undefined) {
      setInitialQuantity(partData.quantidade);
      setAddedQuantity(0);
      setRemovedQuantity(0);
    }
    if (partData && partData.nome) {
      setCurrentName(partData.nome);
    }
  }, [partData]);

  const handleAdd = () => {
    const valueToAdd = parseInt(addInputValue || 0, 10);
    if (valueToAdd > 0) {
      setAddedQuantity((prev) => prev + valueToAdd);
      setAddInputValue("");
    }
  };

  const handleRemove = () => {
    const valueToRemove = parseInt(removeInputValue || 0, 10);
    if (valueToRemove > 0) {
      setRemovedQuantity((prev) => prev + valueToRemove);
      setRemoveInputValue("");
    }
  };

  const handleSave = () => {
    const finalQuantity = initialQuantity + addedQuantity - removedQuantity;
    onSave({ ...partData, quantidade: finalQuantity, nome:currentName });
    onClose();
  };

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setCurrentName(e.target.value);
  };


  const totalQuantity = initialQuantity + addedQuantity - removedQuantity;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box 
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          width: "90%",
          maxWidth: "1000px",
          height: "90%",
          maxHeight: "500px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "var(--primary-color)",
            color: "white",
            p: 1,
            borderRadius: "7px 7px 0 0",
            flexShrink: 0,
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" fontStyle="italic">
              ID
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {partData.id}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {isEditingName ? (
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  value={currentName}
                  onChange={handleNameChange}
                  variant="outlined"
                  size="small"
                  autoFocus
                  sx={{
                    input: { color: "white", fontWeight: "bold" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                    },
                  }}
                />
                <IconButton 
                 onClick={() => setIsEditingName(false)} // Fecha o modo de edição sem salva
                size="small" sx={{ color: "white" }}>
                  <EditIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <Typography variant="h6" fontWeight="bold">
                  {currentName}
                </Typography>
                <IconButton
                  onClick={handleEditNameClick}
                  size="small"
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Box>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            gap: 3,
            p: 3,
            flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap on small screens, no wrap on medium and larger screens
            overflowY: "auto",
          }}
        >
          {/* Actions */}
          <Box
            sx={{
              flex: 1,
              minWidth: "280px",
              border: "2px solid #D9D9D9",
              borderRadius: 2,
              bgcolor: "#F8F8F8",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              Ações
            </Typography>
            <Divider />
            <Box>
              <Typography variant="body2" sx={{mt: 2}}>
                Digite a quantidade de peças que deseja adicionar:
              </Typography>
              <Box sx={{ display: "flex", gap: 4, mt: 2}}>
                <TextField
                  type="number"
                  placeholder="Digite a quantidade"
                  value={addInputValue}
                  onChange={(e) => setAddInputValue(e.target.value)}
                  size="small"
                  sx={{ width: "45%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                  startIcon={
                    <img
                      src="./assets/imagePlus.png"
                      alt="Adicionar"
                      style={{ width: "16px", height: "16px" }}
                    />
                  }
                  sx={{ bgcolor: "#C9E7FF", color: "#0740DA" }}
                >
                  Adicionar
                </Button>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" sx={{mt: 2}}>
                Digite a quantidade de peças que deseja retirar:
              </Typography>
              <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                <TextField
                  type="number"
                  placeholder="Digite a quantidade"
                  value={removeInputValue}
                  onChange={(e) => setRemoveInputValue(e.target.value)}
                  size="small"
                  sx={{ width: "45%" }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemove}
                  startIcon={
                    <img
                      src="./assets/imageSub.png"
                      alt="Remover"
                      style={{ width: "20px", height: "4px" }}
                    />
                  }
                  sx={{ bgcolor: "#FFC9C9", color: "#FF0D0D" }}
                >
                  Remover
                </Button>
              </Box>
            </Box>
            <Divider  sx={{mt: 4}}/>
            <Box sx={{ display: "flex", gap: 2, mt: 1.5 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={
                  <img
                    src="./assets/check.png"
                    alt="Salvar"
                    style={{ width: "16px", height: "16px" }}
                  />
                }
                sx={{ bgcolor: "#B8FFAA", color: "#16BC00", flex: 1 }}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                onClick={onClose}
                startIcon={
                  <img
                    src="./assets/trashCanImage.png"
                    alt="Descartar"
                    style={{ width: "14px", height: "14px" }}
                  />
                }
                sx={{ bgcolor: "#FFC9C9", color: "#FF0D0D", }}
              >
                Descartar Alterações
              </Button>
            </Box>
          </Box>

          {/* Summary */}
          <Box
            sx={{
              flex: 1,
              minWidth: "280px",
              border: "2px solid #D9D9D9",
              borderRadius: 2,
              bgcolor: "#F8F8F8",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              Resumo
            </Typography>
            <Divider />
            <Box sx={{mt: 2}}>
              <Typography variant="body3">
                <strong>Peça:</strong> {partData.nome}
              </Typography>
            </Box>
            <Box sx={{  gap: 1, display: "flex", flexDirection: "column", mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Qtd Anterior:
                </Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "2.2px dotted black", mt:1.4 }} />
                <Typography variant="body2">{initialQuantity}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                  Entrada:
                </Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "2.2px dotted black", mt:1.4 }} />
                <Typography variant="body2">{addedQuantity}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                  Saída:
                </Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "2.2px dotted black", mt:1.4 }} />
                <Typography variant="body3">{removedQuantity}</Typography>
              </Box>
            </Box>
            <Typography variant="body2" textAlign="center" sx={{ fontSize: "12px", mt: 4 }}>
              Esse registro poderá ser encontrado no seu{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "#0740DA", fontWeight: "bold", fontStyle: "italic", cursor: "pointer" }}
                onClick={() => {
                  // Handle navigation to history page
                }}
              >
                Histórico
              </Typography>
            </Typography>
            <Divider />
            <Typography variant="h5" fontWeight="medium"  fontFamily="inter" sx={{mt:2}}>
              Total: {totalQuantity}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditPartModal;