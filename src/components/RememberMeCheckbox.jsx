import React from 'react';

const RememberMeCheckbox = ({ checked, onChange }) => {
  return (
    <div className="remember-me">
      <input
        type="checkbox"
        id="remember-me"
        checked={checked}
        onChange={onChange}
      />
      <div className="div-checkbox-text">
        <label htmlFor="remember-me">Permanecer conectado</label>
      </div>
    </div>
  );
};

export default RememberMeCheckbox;