import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import PasswordInput from './PasswordInput';

const CadastroForm = ({ onCadastro, loginStatus }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCadastro({ nome, email, senha, senhaConfirmacao });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        background: '#ffffff',
        padding: '3%',
        borderRadius: '20px',
        border: '2px solid rgba(217, 217, 217, 1)',
        width: '67%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      noValidate
    >
      {loginStatus.type && (
        <Alert severity={loginStatus.type === 'sucesso' ? 'success' : 'error'}>
          {loginStatus.message}
        </Alert>
      )} 

      <Box sx={{ textAlign: 'left', width: '100%' }}>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}>
          Nome:
        </Typography>
        <TextField
          id="input-nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome aqui."
          fullWidth
          required
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#EBEBEB',
              height: '46px', // Reduced height
            },
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'left', width: '100%' }}>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}>
          Email:
        </Typography>
        <TextField
          id="input-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email aqui."
          fullWidth
          required
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#EBEBEB',
              height: '46px', // Adjusted height
              borderRadius: '8px', // Added border radius for consistency
            },
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'left', width: '100%' }}>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}>
          Senha:
        </Typography>
        <PasswordInput
          id="input-senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Box>

      <Box sx={{ textAlign: 'left', width: '100%' }}>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}>
          Confirmar Senha:
        </Typography>
        <PasswordInput
          id="input-senha-confirmacao"
          value={senhaConfirmacao}
          onChange={(e) => setSenhaConfirmacao(e.target.value)}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          marginTop: '16px',
          width: '50%',
          alignSelf: 'center', // Center the button horizontally
        }}
      >
        Criar Conta
      </Button>
    </Box>
  );
};

export default CadastroForm;
