import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const TittleModal = ({ modalName, onClose, isEditable, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(modalName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (onNameChange) onNameChange(currentName);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between" // Ensures proper spacing between elements
      bgcolor="var(--primary-color)"
      color="white"
      textAlign="center"
      height="6vh"
      p={1}
      borderRadius="8px 8px 0 0"
      width="100%"
    >
      <Box flex="1" /> {/* Empty space to balance alignment */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        fontSize="18px"
        whiteSpace="nowrap"
        overflow="hidden"
        flex="1"
      >
        {isEditing ? (
          <Box display="flex" alignItems="center" gap={1} width="100%">
            <TextField
              value={currentName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              variant="outlined"
              size="small"
              autoFocus
              fullWidth
              sx={{
                input: { color: 'white', fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                },
              }}
            />
            <IconButton size="small" sx={{ color: 'white' }}>
              <EditIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            {currentName}
            {isEditable && (
              <IconButton
                onClick={handleEditClick}
                size="small"
                sx={{ color: 'white', ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            )}
          </>
        )}
      </Box>
      <Box flex="1" display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TittleModal;