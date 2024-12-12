import React, { useState } from "react";
import { TextField } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Security as SecurityIcon,
  CloudSync as CloudSyncIcon,
  VerifiedUser as VerifiedUserIcon,
  LinearScale as LinearScaleIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  Paper,
  Container,
  Select,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [language, setLanguage] = useState("English");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    // Logic for dynamically changing language across the UI
    alert(`Language changed to ${event.target.value}`);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  // Image Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Development Process Images
  const developmentImages = [
    { src: "/images/seam-concept.jpg", title: "Seam Concept" },
    {
      src: "/images/Brainstroming sessions.jpeg",
      title: "Brainstorming Sessions",
    },
    { src: "/images/Industrial Mentoring.jpeg", title: "Secure Authentication" },
    { src: "/images/Deepak is Kanguva.jpeg", title: "Planning" },
    { src: "/images/seam-prototype.jpg", title: "Prototype Development" },
    { src: "/images/seam-testing.jpg", title: "Security Testing" },
    { src: "/images/seam-final.jpg", title: "Final Product" },
  ];

  const tpoImages = [
    {
      src: "/src/assets/5.jpg",
      title: "Access our services across mobile, desktop, and web seamlessly",
    },
    {
      src: "/src/assets/WhatsApp Image 2024-12-12 at 09.34.02_daa8e815.jpg",
      title: "Quick and accurate identity verification within seconds",
    },
  ];

  const indianColors = {
    primary: "#004080",
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Box
      sx={{
        width: "100%", // Ensure full viewport width
        minHeight: "100vh", // Ensure full viewport height
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        overflow: "hidden", // Prevent overflow
      }}
    >
      {/* Top Bar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #001f4d, #004080)",
          width: "100%", // Ensure AppBar spans full width
        }}
      ></AppBar>
      <Container sx={{ my: 6, position: "relative", zIndex: 2 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 1,
            color: indianColors.primary,
            borderRadius: "12px",
          }}
        >
          Secure Encryption and Authentication Model
        </Typography>

        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            width: "100%", // Full screen width
            height: "70vh", // Set height to 70% of the viewport height
            maxWidth: "100vw", // Ensure no overflow beyond screen width
            margin: "0 auto", // Center the content horizontally
            borderRadius: "12px",
            overflow: "hidden", // Prevent content overflow
          }}
        >
          <Slider {...sliderSettings}>
            {tpoImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 4,
                  height: "100%",
                  position: "relative", // Ensure button and title appear correctly on top
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0.7,
                    scale: index === currentSlide ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "90%",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: "center",
                      mt: 2,
                      color: indianColors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    {image.title}
                  </Typography>
                </motion.div>
              </Box>
            ))}
          </Slider>
        </Box>

        <Box
          sx={{
            display: "flex", // Use flexbox
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically (optional, if needed)
            width: "100%", // Ensure it spans the full width of the parent
            mt: 4, // Add top margin for spacing
          }}
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/authenticate"
            startIcon={<SecurityIcon />}
            sx={{
              px: 5,
              py: 2,
              backgroundColor: "#004080",
              color: "#FFFFFF",
              fontWeight: "bold",
              borderRadius: "25px",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#FFA500",
              },
              fontSize: "1.25rem",
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* "Get Started" Button Below the Slider and Centered */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0, // Positions the button 20px from the bottom of the container
            left: "50%", // Horizontally centers the button
            transform: "translateX(-50%)", // Adjusts the button to be exactly centered
          }}
        ></Box>
      </Container>

      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color: "#004080",
          }}
        >
          Why Choose SEAM?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Secure Authentication",
              description:
                "Liveness detection ensures only authorized users access services.",
              icon: "🔑", // Key emoji
            },
            {
              title: "Tamper-Proof Models",
              description:
                "Encryption and obfuscation protect models from reverse engineering.",
              icon: "🛡️", // Shield emoji
            },
            {
              title: "Optimized for Networks",
              description:
                "Lightweight models ensure smooth transactions even on 3G networks.",
              icon: "📶", // Signal bars emoji
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: "12px",
                    textAlign: "center",
                    position: "relative", // To position the line
                  }}
                >
                  {/* Blue Line */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "6px", // Adjust height of the line
                      backgroundColor: "#004080", // Blue color
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#004080",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#004080", mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Interactive Features Section */}
      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color: "#004080",
          }}
        >
          Our Unique Selling Points
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Advanced Security",
              description:
                "Our cutting-edge encryption ensures maximum protection for your data.",
              icon: "🔒", // Lock emoji
            },
            {
              title: "Seamless Integration",
              description:
                "Easily integrates into existing systems for a hassle-free experience.",
              icon: "🔗", // Link emoji
            },
            {
              title: "Real-Time Performance",
              description:
                "Enjoy lightning-fast operations with our optimized processing algorithms.",
              icon: "⚡", // Lightning bolt emoji
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: "12px",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "6px", // Adjust height of the line
                      backgroundColor: "#004080", // Blue color
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#004080",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#004080", mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Development Process Slider */}
      <Container sx={{ my: 6, position: "relative", zIndex: 2 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 1,
            color: indianColors.primary,
            borderRadius: "12px",
          }}
        >
          Development Journey
        </Typography>
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            width: "100%",
            maxWidth: "70%", // Center the slider and limit the width
            margin: "0 auto", // Horizontally center
            borderRadius: "12px",
          }}
        >
          <Slider {...sliderSettings}>
            {developmentImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 8,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0.7,
                    scale: index === currentSlide ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      maxWidth: "100%", // Constrain the image within the slider
                      maxHeight: 400,
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: "start",
                      mt: 0,
                      color: indianColors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    {image.title}
                  </Typography>
                </motion.div>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color: "#004080",
          }}
        >
          Our Key Features
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "User-Friendly Design",
              description:
                "Intuitive interfaces that enhance user experience effortlessly.",
              icon: "🖥️", // Monitor emoji
            },
            {
              title: "Fast Verification",
              description:
                "Quick and accurate identity verification within seconds.",
              icon: "⚡", // Lightning emoji
            },
            {
              title: "Cross-Platform Support",
              description:
                "Access our services across mobile, desktop, and web seamlessly.",
              icon: "📱", // Mobile phone emoji
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#004080",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#004080", mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container
        sx={{ my: 8, backgroundColor: "#f9f9f9", py: 6, borderRadius: "16px" }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color: "#004080",
          }}
        >
          How SEAM Empowers You
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Customizable Solutions",
              description:
                "Tailor-made options to meet unique organizational requirements.",
              icon: "⚙️", // Gear emoji
            },
            {
              title: "Enhanced Accessibility",
              description:
                "Accessible solutions for individuals of all abilities.",
              icon: "♿", // Wheelchair symbol emoji
            },
            {
              title: "Robust Analytics",
              description:
                "Gain insights through detailed reporting and analytics tools.",
              icon: "📊", // Bar chart emoji
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#004080",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#004080", mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        sx={{
          my: 8,
          backgroundColor: "#e8f7f2",
          py: 6,
          borderRadius: "16px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color: "#006b52",
          }}
        >
          Contact Our Hackathon Team
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: "12px",
                textAlign: "center",
                backgroundColor: "#f2f9f5",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#006b52",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Get in Touch
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Send Message
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: "12px",
                textAlign: "center",
                backgroundColor: "#f2f9f5",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#006b52",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Visit Our Virtual Space
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
                We're working hard to innovate for a better tomorrow. Join us on
                our journey!
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: "100%" }}
              >
                Join Our Discord/Slack
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          backgroundColor: "#001f4d",
          textAlign: "center",
          color: "white",
          width: "100%", // Ensure footer is full width
        }}
      >
        <Typography variant="body2">
          © 2024 SEAM. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
