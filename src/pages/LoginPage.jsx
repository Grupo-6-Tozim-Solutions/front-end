import React, { useState } from 'react';
import '../LoginPage.css';
import LoginForm from '../components/LoginForm';
import LoginLeft from '../components/LoginLeft';
import TituloLogin from '../components/TituloLogin';
import LoginHelp from '../components/LoginHelp';
import LinkCadastro from '../components/LinkCadastro';
const LoginPage = () => {
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
    <TituloLogin titulo="Bom dia, Antônio."/>
        <LoginForm 
          onLogin={handleLogin} 
          loginStatus={loginStatus} 
        />
      <div className="div-link-cadastro">
      <LinkCadastro textoBase="Problemas no Logins?" textoLink="Clique aqui."/>
      </div>
      </div> 
      
    </div>
  );
};

export default LoginPage;