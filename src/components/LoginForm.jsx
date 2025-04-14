import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import LoginButton from './LoginButton';
import LoginHelp from './LoginHelp';
import LoginStatus from './LoginStatus';

const LoginForm = ({ onLogin, loginStatus }) => {
  const [credencial, setCredencial] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ credencial, senha, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      <label htmlFor="input-credencial">Email:</label>
      <input
        type="text"
        id="input-credencial"
        value={credencial}
        onChange={(e) => setCredencial(e.target.value)}
        placeholder="Digite seu email ou seu nome aqui."
        required
      />

      <label htmlFor="input-senha">Senha:</label>
      <PasswordInput 
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <RememberMeCheckbox 
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      <LoginButton entrar="Entrar"/>
      <LoginStatus type={loginStatus.type} message={loginStatus.message} />
    
    </form>
  );
};

export default LoginForm;