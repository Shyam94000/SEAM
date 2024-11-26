import React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";

const AuthenticatedProfile = ({ name, image }) => {
  if (!name) return null;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        width: "600px",
        height: "475px", // Set a fixed width for the card
        mx: "auto",
        mt: 5,
        textAlign: "center",
        borderRadius: "16px",
        background:
          "linear-gradient(180deg, white 18%, rgba(255, 190, 50, 0.8) 65%, rgba(10, 190, 40, 0.7) 100%)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
        position: "relative",
      }}
    >
      {/* Top Left Logo */}
      <Box
        component="img"
        src="/src/assets/logo-left.png"
        alt="Left Logo"
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 95,
          height: 45,
        }}
      />

      {/* Top Right Logo */}
      <Box
        component="img"
        src="/src/assets/logo-right.png"
        alt="Right Logo"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 95,
          height: 55,
        }}
      />

      {/* Success Message */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#4caf50",
        }}
      >
        Authentication Successful!
      </Typography>

      {/* Byline */}
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontWeight: "400",
          color: "#555",
          fontStyle: "bold",
          mt: 1,
        }}
      >
        Secure authentication via SEAM
      </Typography>

      {/* Welcome Text */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "500", color: "#333", mt: 2 }}
      >
        Welcome, <span style={{ color: "#1976d2" }}>{name}</span>!
      </Typography>

      {/* User Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          gap: 3,
        }}
      >
        {/* Registered Image */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "500",
              mb: 1,
              color: "#555",
            }}
          >
            Your Aadhaar Number: 1111 2222 3333
          </Typography>
        </Box>
        <Box>
          <Avatar
            src={image}
            alt="Registered face"
            sx={{
              width: 200, // Fixed width for the avatar
              height: 200, // Fixed height for the avatar
              border: "2px solid #4caf50",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        {/* Personalized Message */}
        <Typography
          variant="body6"
          sx={{
            fontSize: "1.5rem",
            color: "#2234a8",
            lineHeight: "1.5",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(5, 5, 9, 0.1)",
          }}
        >
          मेरा <span style={{ color: "red", fontWeight: "bold" }}>आधार</span>,
          मेरी पहचान
        </Typography>
      </Box>
    </Paper>
  );
};

export default AuthenticatedProfile;
