import React from 'react';

const RightContainer = ({ children }) => {
  const rightContainerStyle = {
    width: '40%',
    height: '91%',
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid #0740DA',
    borderRadius: '16px',
  };

  return (
    <div style={rightContainerStyle}>
      {children}
    </div>
  );
};

export default RightContainer;
