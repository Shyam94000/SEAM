import React, { useState } from "react";
import { useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Box, Typography, Button, Grid, Paper, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

import {
  Security as SecurityIcon,
  CloudSync as CloudSyncIcon,
  VerifiedUser as VerifiedUserIcon,
  LinearScale as LinearScaleIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Indian Color Palette
  const indianColors = {
    primary: "#1A73E8", // Modern Indigo
    secondary: "#FF9800", // Saffron
    accent: "#4CAF50", // Emerald Green
    background: "#F0F4C3", // Soft Khadi
  };

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
    { src: "/images/Industrial Mentoring.jpeg", title: "Industrial Mentoring" },
    { src: "/images/Deepak is Kanguva.jpeg", title: "Planning" },
    { src: "/images/seam-prototype.jpg", title: "Prototype Development" },
    { src: "/images/seam-testing.jpg", title: "Security Testing" },
    { src: "/images/seam-final.jpg", title: "Final Product" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: `linear-gradient(135deg, 
          ${indianColors.background} 40%, 
          ${indianColors.background}CC 50%, 
          ${indianColors.background}99 100%)`,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background:
            "linear-gradient(180deg, white 18%, rgba(255, 190, 50, 0.8) 65%, rgba(10, 190, 40, 0.7) 100%) ",
          borderRadius: "12px",
        }}
      >
        <Fade cascade>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#2234a8",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Welcome to SEAM
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Secure Encryption and Authentication Model
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/authenticate"
            startIcon={<SecurityIcon />}
            sx={{
              mt: 4,
              px: 4,
              py: 2,
              backgroundColor: "#2962FF",
              color: "white",
              fontWeight: "bold",
              borderRadius: "25px",
              ":hover": {
                backgroundColor: "#FFA500",
              },
            }}
          >
            Get Started
          </Button>
        </Fade>
      </Box>

      {/* Features Section */}
      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color:
              "linear-gradient(135deg, white 12%, rgba(10, 190, 40, 0.9) 100%)",
            borderRadius: "12px",
          }}
        >
          Why Choose SEAM?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Fade>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  backgroundColor: "#e3f2fd",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
                >
                  Secure Authentication
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Liveness detection ensures only authorized users access
                  services.
                </Typography>
              </Paper>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  backgroundColor: "#e8f5e9",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
                >
                  Tamper-Proof Models
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Encryption and obfuscation protect models from reverse
                  engineering.
                </Typography>
              </Paper>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  backgroundColor: "#fff3e0",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#ef6c00", mb: 2 }}
                >
                  Optimized for Networks
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Lightweight models ensure smooth transactions even on 3G
                  networks.
                </Typography>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Process Flow */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#BBDEFB",
          textAlign: "center",
          borderRadius: "12px",
        }}
      >
        <Fade>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2234a8",
              mb: 4,
            }}
          >
            How SEAM Works
          </Typography>
          <Container>
            <Typography
              variant="body1"
              sx={{
                mb: 6,
                color: "#555",
                lineHeight: "1.6",
                fontweight: "bold",
              }}
            >
              SEAM integrates advanced face authentication and AI-driven
              liveness checks directly into your browser. Here’s how it works:
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#4caf50",
                      mb: 2,
                    }}
                  >
                    Step 1
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                    }}
                  >
                    Access SEAM via a secure desktop browser.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#4caf50",
                      mb: 2,
                    }}
                  >
                    Step 2
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                    }}
                  >
                    Capture your face via webcam with real-time liveness
                    detection.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#4caf50",
                      mb: 2,
                    }}
                  >
                    Step 3
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                    }}
                  >
                    Authenticate using secure AI models.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#4caf50",
                      mb: 2,
                    }}
                  >
                    Step 4
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                    }}
                  >
                    Access your services securely.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Fade>
      </Box>

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
            width: "100%",
            maxWidth: 800,
            margin: "auto",
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
                  p: 6,
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
                      maxWidth: "150%",
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

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          backgroundColor: "#2234a8",
          textAlign: "center",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 2,
          }}
        >
          © 2024 SEAM. All Rights Reserved.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/TeamPage"
          sx={{
            backgroundColor: "#4caf50",
            ":hover": {
              backgroundColor: "#66bb6a",
            },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
