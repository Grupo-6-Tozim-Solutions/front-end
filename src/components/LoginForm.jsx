import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';
import PasswordInput from './PasswordInput';

const LoginForm = ({ onLogin, loginStatus }) => {
  const [credencial, setCredencial] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ credencial, senha, rememberMe });
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
          Email:
        </Typography>
        <TextField
          id="input-credencial"
          value={credencial}
          onChange={(e) => setCredencial(e.target.value)}
          placeholder="Digite seu email ou seu nome aqui."
          fullWidth
          required
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#EBEBEB',
              height: '46px',
              borderRadius: '8px',
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

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            color="primary"
          />
        }
        label="Lembrar-me"
        sx={{ alignSelf: 'flex-start' }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          marginTop: '16px',
          width: '50%',
          alignSelf: 'center',
        }}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default LoginForm;