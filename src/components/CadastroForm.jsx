import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import PasswordInput from './PasswordInput';

const CadastroForm = ({ onCadastro, loginStatus, senhaErrors }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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
              height: '46px',
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
          error={senhaErrors.length > 0}
        />
      </Box>

      {/* Adicionar exibição dos erros de senha */}
      {senhaErrors.length > 0 && (
        <Box sx={{ 
          textAlign: 'left',
          backgroundColor: '#fff5f5',
          padding: 2,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'error.light'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'error.main' }}>
            A senha deve conter:
          </Typography>
          <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
            {senhaErrors.map((error, index) => (
              <Typography 
                key={index} 
                variant="body2" 
                component="li"
                sx={{ color: 'error.main' }}
              >
                {error}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

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
          alignSelf: 'center',
        }}
      >
        Criar Conta
      </Button>
    </Box>
  );
};

export default CadastroForm;