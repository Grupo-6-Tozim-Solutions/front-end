import React from 'react';

const LoginStatus = ({ type, message }) => {
  if (!type) return null;

  return (
    <div className={`login-status ${type}`}>
      {message}
    </div>
  );
};

export default LoginStatus;