import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ mb: 2, textAlign: "center", width: "100%" }}>
      {/* Logo container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20, // Adjusted gap between logos
          flexWrap: "wrap", // Allow logos to wrap on smaller screens
          mb: 1,
        }}
      >
        <img
          src="/src/assets/logos/logo1.png"
          alt="Logo 1"
          style={{ height: "80px", maxWidth: "90%" }}
        />
        <img
          src="/src/assets/logos/logo2.png"
          alt="Logo 2"
          style={{ height: "80px", maxWidth: "90%" }}
        />
        <img
          src="/src/assets/logos/logo3.png"
          alt="Logo 3"
          style={{ height: "80px", maxWidth: "90%" }}
        />
      </Box>

      {/* Title Text */}
      <Typography
        variant="h9"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1rem", sm: "1.5rem", md: "1.25rem" }, // Responsive font size
          lineHeight: 1.4,
        }}
      >
        Secure Encryption and Authentication System
      </Typography>
    </Box>
  );
};

export default Header;
