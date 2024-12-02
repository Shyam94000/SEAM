import React, { useState, useEffect, lazy, Suspense } from "react";
import * as faceapi from "face-api.js";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// Lazy load components
const FaceAuthentication = lazy(() => import("./components/FaceAuthentication"));
const AuthenticatedProfile = lazy(() => import("./components/AuthenticatedProfile"));
const Header = lazy(() => import("./components/Header"));
const TeamPage = lazy(() => import("./components/TeamPage"));
const HomePage = lazy(() => import("./components/HomePage"));

function App() {
  const [mode, setMode] = useState(1);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authenticationResult, setAuthenticationResult] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "http://localhost:3000/models";
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  const handleAuthenticated = (user, result) => {
    if (user && user !== authenticatedUser) {
      setAuthenticatedUser(user);
      setAuthenticationResult(result);
      navigate("/profile");
    }
  };

  if (!modelsLoaded) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h5" sx={{ mt: 3, color: "#000000" }}>
            Loading face recognition models...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Suspense fallback={<CircularProgress />}>
          <Header />
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}></Box>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/authenticate"
              element={
                <FaceAuthentication
                  onAuthenticated={handleAuthenticated}
                />
              }
            />

            <Route
              path="/profile"
              element={
                authenticatedUser && authenticationResult ? (
                  <AuthenticatedProfile
                    name={authenticatedUser}
                    image={authenticationResult.image}
                    number={authenticationResult.aadharNumber}
                  />
                ) : (
                  <Typography variant="h5" sx={{ textAlign: "center", mt: 5 }}>
                    Unauthorized Access
                  </Typography>
                )
              }
            />
            <Route path="/TeamPage" element={<TeamPage />} />
          </Routes>
        </Suspense>
      </Box>
    </Container>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}