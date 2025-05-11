import React, { useState } from "react";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const TittleModal = ({ modalName, onClose, isEditable, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(modalName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCurrentName(e.target.value);
  };

  useEffect(() => {
  setCurrentName(modalName);
}, [modalName]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#0740DA",
        color: "white",
        textAlign: "center",
        height: "6vh",
        padding: "8px",
        borderRadius: "8px 8px 0 0",
        width: "100%",
      }}
    >
      <Box flex="1" /> {/* Empty space to balance alignment */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "18px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          flex: "1",
        }}
      >
        {isEditing ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <TextField
              value={currentName}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              autoFocus
              fullWidth
              sx={{
                  width:"50%",
                  ml:"20%",
                input: { color: "white", fontWeight: "bold" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white", },
                },
              }}
            />
            <IconButton
              onClick={() => {
                setIsEditing(false);
                onNameChange(currentName); // <- Notifica o nome novo
              }}
              size="small" sx={{ color: "white" }}>
              <EditIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <Typography>{currentName}</Typography>
            {isEditable && (
              <IconButton
                onClick={handleEditClick}
                size="small"
                sx={{ color: "white", ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            )}
          </>
        )}
      </Box>
      <Box flex="1" display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TittleModal;