import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Divider } from "@mui/material";

const HeaderStorage = ({ 
  title, 
  subtitle, 
  filterText, 
  addText, 
  historyText, 
  logoutText, 
  onFilter, 
  onAdd, 
  onHistory, 
  onLogout 
}) => {
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
          
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={onFilter}>
            {filterText}
          </Button>
          <Button variant="contained" color="secondary" onClick={onAdd}>
            {addText}
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button variant="outlined" color="primary" onClick={onHistory}>
            {historyText}
          </Button>
          <Button variant="outlined" color="error" onClick={onLogout}>
            {logoutText}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderStorage;
