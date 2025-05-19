import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import '../LoginPage.css';
import LoginLeft from '../components/LoginLeft';
import TituloLogin from '../components/TituloLogin';
import CadastroForm from '../components/CadastroForm';
import LinkCadastro from '../components/LinkCadastro';
import { api } from '../Provider/apiProvider'

const CadastroPage = () => {
  const [loginStatus, setLoginStatus] = useState({ type: null, message: '' });
  const navigate = useNavigate();

  const handleCadastro = ({ nome, email, senha, senhaConfirmacao }) => {
    if (senha !== senhaConfirmacao) {
      setLoginStatus({ type: 'erro', message: 'As senhas não coincidem.' });
      return;
    }

    api.post('/usuario', { nome, email, senha })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoginStatus({ type: 'sucesso', message: 'Cadastro realizado com sucesso!' });
          navigate('/login');
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro.';
        setLoginStatus({ type: 'erro', message: errorMessage });
      });
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f4f4">
      <LoginLeft />
      <Box
        className="right-panel"
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "3% 0 0 0",
          marginTop: "-5%",
      
        }}
      >
        <TituloLogin titulo="Cadastro" />
        <CadastroForm onCadastro={handleCadastro} loginStatus={loginStatus} />
        <Box className="div-link-cadastro" sx={{ marginTop: "-2%" }}>
          <Typography>
            Já possui conta?{' '}
            <LinkCadastro
              textoBase=""
              textoLink="Clique aqui."
              onClick={() => navigate('/login')}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CadastroPage;