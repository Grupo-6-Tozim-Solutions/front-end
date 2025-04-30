import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import '../LoginPage.css';
import LoginLeft from '../components/LoginLeft';
import TituloLogin from '../components/TituloLogin';
import CadastroForm from '../components/CadastroForm';
import LinkCadastro from '../components/LinkCadastro';
import axios from 'axios';

const CadastroPage = () => {
  const [loginStatus, setLoginStatus] = useState({ type: null, message: '' });
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleCadastro = ({ nome, email, senha, senhaConfirmacao }) => {
    if (senha !== senhaConfirmacao) {
      setLoginStatus({ type: 'erro', message: 'As senhas não coincidem.' });
      return;
    }
  
    axios.post('http://localhost:8080/usuario', {
      nome,
      email,
      senha,
    })
    .then((response) => {
      console.log('Resposta do servidor:', response);
      if (response.status === 200 || response.status === 201) {
        setLoginStatus({ type: 'sucesso', message: 'Cadastro realizado com sucesso!' });
        navigate('/login'); // Redireciona para a página de login
      }
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
      const errorMessage =
        error.response?.data?.message || 'Erro ao realizar cadastro.';
      setLoginStatus({ type: 'erro', message: errorMessage });
    });
  };

  return (
    <div className="login-page">
      <LoginLeft />
      <div className="right-panel">
        <TituloLogin titulo="Cadastro" />
        <CadastroForm 
          onCadastro={handleCadastro} 
          loginStatus={loginStatus} 
        />
        <div className="div-link-cadastro">
          <LinkCadastro 
            textoBase="Já possui conta?" 
            textoLink="Clique aqui." 
            onClick={() => navigate('/login')} // Navega para a página de login
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;