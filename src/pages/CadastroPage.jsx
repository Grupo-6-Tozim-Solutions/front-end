import React, { useState } from 'react';
import '../LoginPage.css';
import LoginForm from '../components/LoginForm';
import LoginLeft from '../components/LoginLeft';
import TituloLogin from '../components/TituloLogin';
import LoginHelp from '../components/LoginHelp';
import LoginPage from './LoginPage';
import CadastroForm from '../components/CadastroForm';
import LinkCadastro from '../components/LinkCadastro';
const CadastroPage = () => {
  const [loginStatus, setLoginStatus] = useState({ type: null, message: '' });

  const handleLogin = (credentials) => {
    // Simulação de login - substituir por chamada real à API
    console.log('Credenciais:', credentials);
    if (credentials.credencial && credentials.senha) {
      setLoginStatus({ type: 'sucesso', message: 'Login realizado com sucesso!' });
    } else {
      setLoginStatus({ type: 'erro', message: 'Credenciais inválidas' });
    }
  };

  return (
    <div className="login-page">
      <LoginLeft />
      <div className="right-panel">
    <TituloLogin titulo="Cadastro."/>
        <CadastroForm 
          onLogin={handleLogin} 
          loginStatus={loginStatus} 
        /> <div className="div-link-cadastro">
         <LinkCadastro textoBase="Já possui conta?" textoLink="Clique aqui."/>
         </div>
      </div> 
      
    </div>
  );
};

export default CadastroPage;