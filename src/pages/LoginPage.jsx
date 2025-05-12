import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import '../LoginPage.css';
import LoginForm from '../components/LoginForm';
import LoginLeft from '../components/LoginLeft';
import TituloLogin from '../components/TituloLogin';
import LinkCadastro from '../components/LinkCadastro';
import axios from 'axios'; // Importa o axios para requisições HTTP
import { api } from "../provider/apiProvider"

const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  
  const handleLogin = (credentials) => {
    console.log('Enviando credenciais:', {
      email: credentials.credencial,
      senha: credentials.senha,
    });
  
    setIsLoading(true); // Ativa o estado de carregamento
  
    api.get('/usuario/login', {
      params: {
        email: credentials.credencial,
        senha: credentials.senha,
      },
    })
    .then((response) => {
      console.log('Resposta do servidor:', response);
      if (response.status === 200) {
        setLoginStatus({ type: 'sucesso', message: 'Login realizado com sucesso!' });
        setTimeout(() => {
          navigate('/counch'); // Redireciona para a página CounchPage após 2 segundos
        }, 2000);
      }
    })
    .catch((error) => {
      console.error('Erro na autenticação:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro ao realizar login.';
      setLoginStatus({ type: 'erro', message: errorMessage });
    })
    .finally(() => {
      setIsLoading(false); // Desativa o estado de carregamento
    });
  };

  return (
    <div className="login-page">
      <LoginLeft />
      <div className="right-panel">
        <TituloLogin titulo="Bem-vindo" />
        {isLoading ? (
          <div className="loading">Carregando...</div> // Indicador de carregamento
        ) : (
          <LoginForm 
            onLogin={handleLogin} 
            loginStatus={loginStatus} 
          />
        )}
        <div className="div-link-cadastro">
          <LinkCadastro 
            textoBase="Problemas no Login?" 
            textoLink="Clique aqui." 
            onClick={() => navigate('/')} // Navega para a página de cadastro
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;