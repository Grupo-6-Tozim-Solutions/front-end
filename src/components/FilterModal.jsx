import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TittleModal from "./TittleModal";
import CustomButton from "./CustomButton";

const FilterModal = ({ isOpen, onClose, onApply, onFilter }) => {
  const [filterName, setFilterName] = useState("");
  const [order, setOrder] = useState("");

  const handleApplyFilter = () => {
    const criteria = {
      name: filterName,
      order,
    };
    onFilter(criteria);
    onApply();
  };

  const isInputFilled = filterName.trim() !== "";
  const isCheckboxFilled = order !== "";

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#F0F0F0",
          borderRadius: "10px",
          width: { xs: "90%", sm: "700px" }, // Responsive width
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          height: { xs: "auto", sm: "50%" }, // Adjust height for smaller screens
        }}
      >
        {/* Header */}
        <TittleModal modalName="Filtros" isEditable={false} onClose={onClose} />

        {/* Content */}
        <Box
          sx={{
            padding: { xs: "16px", sm: "25px" }, // Responsive padding
            height: "100%",
            backgroundColor: "#F0F0F0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
              gap: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              height: "85%",
              padding: "18px",
                backgroundColor: "#F8F8F8",
            }}
          >
            {/* Left Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "50%" }, // Full width on small screens
                gap: "16px",
                marginLeft: "10px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "black",
                  flexShrink: 0,
                }}
              >
                Filtrar por:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <TextField
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: "black", marginRight: "15px" }} />,
                  }}
                  placeholder="Filtrar por nome"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{
                    width: "90%",
                    mt: "16px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px",
                        "& fieldset": {
                            borderColor: "#0740DA",

                        },

                    },
                  }}
                />
              </Box>
              <CustomButton
                imageSrc="./assets/imagePlus.png"
                text="Aplicar"
                buttonStyle={{
                  backgroundColor: isCheckboxFilled ? "#E0E0E0" : "#C9E7FF",
                  color: isCheckboxFilled ? "#A0A0A0" : "#0740DA",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
                  maxWidth: "200px", // Limit the button's width
                  marginTop: { xs: "16px", sm: "auto" },
                  marginLeft: "auto", // Align the button to the right
                  cursor: isCheckboxFilled ? "not-allowed" : "pointer",
                  "&:hover": {
                    backgroundColor: isCheckboxFilled ? "#E0E0E0" : "#B0D8FF",
                  },
                }}
                imageStyle={{
                  width: "16px",
                  height: "16px",
                }}
                onClick={isCheckboxFilled ? null : handleApplyFilter}
              />
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "#ccc", height: "100%" }}
            />

            {/* Right Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "50%" }, // Full width on small screens
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "black",
                    marginBottom: "8px",
                  }}
                >
                  Ordenar por:
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    sx={{ display: "flex", marginTop: "10px" }}
                  >
                    <FormControlLabel
                      value="smallest"
                      control={<Radio sx={{ color: "#0740DA" }} />}
                      label="Menor Número de peças"
                    />
                    <FormControlLabel
                      value="largest"
                      control={<Radio sx={{ color: "#0740DA" }} />}
                      label="Maior Número de peças"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <CustomButton
                imageSrc="./assets/imagePlus.png"
                text="Aplicar"
                buttonStyle={{
                  backgroundColor: isInputFilled ? "#E0E0E0" : "#C9E7FF",
                  color: isInputFilled ? "#A0A0A0" : "#0740DA",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
                  maxWidth: "200px", // Limit the button's width
                  marginTop: { xs: "16px", sm: "auto" },
                  marginLeft: "auto", // Align the button to the right
                  cursor: isInputFilled ? "not-allowed" : "pointer",
                  "&:hover": {
                    backgroundColor: isInputFilled ? "#E0E0E0" : "#B0D8FF",
                  },
                }}
                imageStyle={{
                  width: "16px",
                  height: "16px",
                }}
                onClick={isInputFilled ? null : handleApplyFilter}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;