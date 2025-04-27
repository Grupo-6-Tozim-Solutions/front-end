import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import LoginStatus from './LoginStatus';

const CadastroForm = ({ onCadastro, loginStatus }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCadastro({ nome, email, senha, senhaConfirmacao });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      <label htmlFor="input-nome">Nome:</label>
      <input
        className="input-credencial"
        type="text"
        id="input-nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome aqui."
        required
      />

      <label htmlFor="input-email">Email:</label>
      <input
        className="input-credencial"
        type="email"
        id="input-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email aqui."
        required
      />

      <label htmlFor="input-senha">Senha:</label>
      <PasswordInput
        id="input-senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <label htmlFor="input-senha-confirmacao">Confirmar Senha:</label>
      <PasswordInput
        id="input-senha-confirmacao"
        value={senhaConfirmacao}
        onChange={(e) => setSenhaConfirmacao(e.target.value)}
      />

      <LoginButton entrar="Criar Conta" />
      <LoginStatus type={loginStatus.type} message={loginStatus.message} />
    </form>
  );
};

export default CadastroForm;
