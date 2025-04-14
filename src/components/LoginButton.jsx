import React from 'react';

const LoginButton = (props) => {
  return (
    <div className="button-submit">
      <button type="submit" id="btn-login">
        <span>{props.entrar}</span>
      </button>
    </div>
  );
};

export default LoginButton;