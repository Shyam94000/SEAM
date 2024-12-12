import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
// linear-gradient(to right, #001F3F, #003F7F)
const Header = () => {
  return (
    <AppBar position="static" sx={{ background: "#FFFFFF" }}>
      <Toolbar>
        {/* Logo and Title */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            background: "#ffffff",
          }}
        >
          <img
            src="/src/assets/logos/logo3.png"
            alt="Logo"
            style={{ height: "50px", marginRight: "16px" }}
          />
          <img
            src="/src/assets/logos/logo1.png"
            alt="Logo"
            style={{ height: "50px", marginRight: "16px" }}
          />
          <img
            src="/src/assets/logos/logo2.png"
            alt="Logo"
            style={{ height: "50px", marginRight: "16px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#FFFFFF" }}
          ></Typography>
        </Box>

        {/* Navigation Options */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{ color: "#00008B", fontWeight: "bold", textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="https://register-seam.web.app/"
            sx={{ color: "#00008B", fontWeight: "bold", textTransform: "none" }}
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/authenticate"
            sx={{ color: "#00008B", fontWeight: "bold", textTransform: "none" }}
          >
            Authenticate
          </Button>
          <Button
            component={Link}
            to="https://docs.google.com/spreadsheets/d/1IyWMqQ4kw4Hw9pt6s52xM8s_3Yfz09WU/edit?gid=326895161#gid=326895161"
            sx={{ color: "#00008B", fontWeight: "bold", textTransform: "none" }}
          >
            Analytics
          </Button>
          <Button
            component={Link}
            to="https://drive.google.com/file/d/17t3E_suAD3GasW5RMHn_zUb1bPMeZyOD/view"
            sx={{ color: "#00008B", fontWeight: "bold", textTransform: "none" }}
          >
            Documentation
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Sub-header with logos */}
    </AppBar>
  );
};

export default Header;
