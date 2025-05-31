import React from "react";
import { Box, Typography, Button } from "@mui/material";
import FastForwardIcon from "@mui/icons-material/FastForward";

const SofaRowModal = ({
  text,
  quantity: initialQuantity,
  onDecrease,
  onIncrease,
  onFastForward,
  isEven,
  isFastForwardDisabled
}) => {
  const backgroundColor = isEven ? "#EBEBEB" : "#F8F8F8";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "14px",
        width: "100%",
        borderRadius: "7px",
        backgroundColor,
        padding: "12px 16px",
        height: "50px",
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          textAlign: "left",
          width: "50%",
        }}
      >
        {text}
      </Box>


      {/* Fast Forward Button */}
      <Button
        onClick={onFastForward}
        variant="contained"
        disabled={isFastForwardDisabled}
        sx={{
          backgroundColor: "#B8FFAA",
          "&:hover": { backgroundColor: "#A8FF88", transform: 0, boxShadow: 'none' },
          color: "#16BC00",
          fontWeight: "bold",
          padding: "6px 16px",
          flexShrink: 0,
          textTransform: "none",
          minWidth: "120px",
          boxShadow: 'none'
        }}
      >
        <FastForwardIcon sx={{ mr: 1 }} />
      </Button>
    </Box>
  );
};

export default SofaRowModal;