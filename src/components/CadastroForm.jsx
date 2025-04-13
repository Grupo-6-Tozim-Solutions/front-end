import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import LoginButton from './LoginButton';
import LoginHelp from './LoginHelp';
import LoginStatus from './LoginStatus';
const LoginForm = ({ onLogin, loginStatus }) => {
  const [credencial, setCredencial] = useState('');
  const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ credencial, senha, senhaConfirmacao });
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

    <label htmlFor="input-senha" className='input-confirma-senha'>Confirmar Senha:</label>
      <PasswordInput 
        value={senhaConfirmacao}
        onChange={(e) => setSenhaConfirmacao(e.target.value)}
      />   
      <LoginButton entrar="Criar Conta"/>
      <LoginStatus type={loginStatus.type} message={loginStatus.message} />
    </form>
  );
};

export default LoginForm;