import React from 'react';

const LeftWrapper = ({ children }) => {

  return (
    <div style={leftWrapperStyle}>
      <div style={leftContainerStyle}>
        {children}
      </div>
    </div>
  );
};

const leftWrapperStyle = {
    width: '60%',
    border: '3px solid var(--silver-color)',
    height: '100%',
    borderRadius: '15px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflowY:'auto',
  };

  const leftContainerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

export default LeftWrapper;
