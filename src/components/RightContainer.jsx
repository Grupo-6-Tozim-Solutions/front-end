import React from "react";
import { Box } from "@mui/material";

const RightContainer = ({ children }) => {
  return (
    <Box
      sx={{
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "3px solid var(--silver-color)",
        borderRadius: "16px",
      }}
    >
      {children}
    </Box>
  );
};

export default RightContainer;
