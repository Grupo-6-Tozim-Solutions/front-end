import React from "react";
import { Button, Box, Typography } from "@mui/material";

const CustomButton = ({ imageSrc, imageStyle, text, buttonStyle, onClick, enableHover = false }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "#FFC9C9",
        color: "#FF0D0D",
        borderRadius: "4px",
        padding: "8px 28px",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        gap: "7px",
        textTransform: "none",
        transition: "background-color 0.3s, transform 0.2s",
        "&:hover": {
          backgroundColor: enableHover ? "#FF6B6B" : "#FFC9C9",
          transform: enableHover ? "scale(1.05)" : "none",
        },
        ...buttonStyle,
      }}
    >
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt="button-icon"
          sx={{
            width: "20px",
            height: "20px",
            marginRight: "7px",
            ...imageStyle,
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default CustomButton;
