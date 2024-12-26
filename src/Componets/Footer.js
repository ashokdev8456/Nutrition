import React from "react";
import { Box, Typography, Link, Divider, IconButton, useTheme } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"; // Updated for Twitter

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#2C3E50" : "#2196F3", // Dynamic background color based on theme
        color: "#FFFFFF", // White text for good contrast
        textAlign: "center",
        padding: 3,
        marginTop: "30px", // Ensures the footer stays at the bottom
      }}
    >


      {/* Copyright Info */}
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        © {new Date().getFullYear()} Senior Nutrition Guides. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
