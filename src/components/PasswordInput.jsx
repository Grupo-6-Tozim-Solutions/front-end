import React, { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <input
        type={showPassword ? 'text' : 'password'}
        id="input-senha"
        value={value}
        onChange={onChange}
        placeholder="Digite sua senha aqui."
        required
      />
      <span 
        className={`toggle-password ${showPassword ? 'visible' : ''}`}
        onClick={togglePasswordVisibility}
      ></span>
    </div>
  );
};

export default PasswordInput;