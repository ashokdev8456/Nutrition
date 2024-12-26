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
      {/* Divider for separation */}
      <Divider sx={{ marginBottom: 2, borderColor: "#FFFFFF" }} />

      {/* Links for Privacy Policy, Terms of Service, Help & Support */}
      <Typography variant="body2">
        <Link href="/help" color="inherit" underline="hover" sx={{ marginX: 2 }}>
          Help & Support
        </Link>
        <Link href="/privacy-policy" color="inherit" underline="hover" sx={{ marginX: 2 }}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" color="inherit" underline="hover" sx={{ marginX: 2 }}>
          Terms of Service
        </Link>
      </Typography>

      {/* Social Media Icons */}
      <Box sx={{ marginTop: 2 }}>
        <IconButton
          href="https://www.facebook.com"
          target="_blank"
          color="inherit"
          sx={{ marginX: 1 }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ marginX: 1 }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          href="https://www.instagram.com"
          target="_blank"
          color="inherit"
          sx={{ marginX: 1 }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com"
          target="_blank"
          color="inherit"
          sx={{ marginX: 1 }}
        >
          <LinkedIn />
        </IconButton>
      </Box>

      {/* Divider for separation */}
      <Divider sx={{ marginTop: 2, borderColor: "#FFFFFF" }} />

      {/* Copyright Info */}
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        © {new Date().getFullYear()} Senior Nutrition Guides. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
