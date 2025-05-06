import React from 'react';
import { Box, Modal, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TittleModal from './TittleModal';

const ConfirmationModals = ({ isOpen, title, message, onConfirm, imagem, textButtonDelete, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          width: '100vw', // Adjusted for responsiveness
          maxWidth: '550px', // Ensures a maximum width
          height: 'auto', // Adjust height to fit content
          maxHeight: '100vh', // Ensures content doesn't overflow vertically
          overflow: 'auto', // Adds scroll if content overflows
        }}
      >
        <TittleModal modalName="Sair" isEditable={false} onClose={onClose} />
        <Box textAlign="center" mt={2.5} px={2}> {/* Added padding for better spacing */}
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
          <Typography variant="body2" mt={0.5}>
            {message}
          </Typography>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            startIcon={<img src={imagem} alt="" style={{ width: '18px', height: '18px' }} />}
            sx={{ mt: 3 }}
          >
            {textButtonDelete}
          </Button>
          <Typography variant="caption" display="block" mt={3} mb={2} fontWeight="500">
            Clique fora desse POP-UP ou no X para cancelar a ação
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModals;