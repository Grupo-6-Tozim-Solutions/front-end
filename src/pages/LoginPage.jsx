import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import LoginForm from '../components/LoginForm';
import LoginLeft from '../components/LoginLeft';
import TituloLogin from '../components/TituloLogin';
import LinkCadastro from '../components/LinkCadastro';
import { api } from '../Provider/apiProvider'

const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    setIsLoading(true);

    api.post('/usuario/login', {
      email: credentials.email, // o campo que o back espera
      senha: credentials.senha,
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token); // se vier como { token: "..." }
          setLoginStatus({ type: 'sucesso', message: 'Login realizado com sucesso!' });
          setTimeout(() => {
            navigate('/counch');
          }, 2000);
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Erro ao realizar login.';
        setLoginStatus({ type: 'erro', message: errorMessage });
      })
      .finally(() => {
        setIsLoading(false);
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
          alignItems: "center",
          padding: "3% 0 0 0",
          gap: "10%",
        }}
      >
        <TituloLogin titulo="Bem-vindo"
        />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <LoginForm onLogin={handleLogin} loginStatus={loginStatus} />
        )}
        <Box className="div-link-cadastro" sx={{ marginTop: "2%" }}>
          <Typography>
            Não possui conta?{' '}
            <LinkCadastro
              textoBase=""
              textoLink="Clique aqui."
              onClick={() => navigate('/')}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;