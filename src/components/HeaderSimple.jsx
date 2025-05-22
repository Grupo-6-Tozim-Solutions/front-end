import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const HeaderSimple = ({ title, subtitle }) => {
  return (
    <AppBar position="static" color="default" sx={{ padding: "10px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {subtitle}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderSimple;
