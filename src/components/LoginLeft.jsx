import React from 'react';
import { Box } from '@mui/material';

const LoginLeft = () => {
  return (
    <Box
      sx={{
        width: "40%",
        height: "100vh",
        backgroundColor: "var(--primary-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../../public/assets/box.png"
          alt="Logo"
          style={{ height: "78%", width: "auto", opacity: 0.9 }}
        />
      </Box>
    </Box>
  );
};

export default LoginLeft;