import React, { useState, useEffect, lazy, Suspense } from "react";
import * as faceapi from "face-api.js";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { verifyModelHashes } from "./components/modelHashUtils.js";

// Lazy load components
const FaceAuthentication = lazy(() => import("./components/FaceAuthentication"));
const AuthenticatedProfile = lazy(() => import("./components/AuthenticatedProfile"));
const Header = lazy(() => import("./components/Header"));
const TeamPage = lazy(() => import("./components/TeamPage"));
const HomePage = lazy(() => import("./components/HomePage"));

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authenticationResult, setAuthenticationResult] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [hashVerificationError, setHashVerificationError] = useState(null);
  const navigate = useNavigate();

  // Function to load models from the server
  const loadModels = async () => {
    const MODEL_URL = "https://sihseam2024mainbackend.azurewebsites.net/models";
    const MAX_RETRIES = 3;
    let currentAttempt = 0;
  
    const attemptLoadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
  
        // Add a slight delay to ensure models are fully processed
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setModelsLoaded(true);
        return true;
      } catch (error) {
        console.error(`Model loading attempt ${currentAttempt + 1} failed:`, error);
        
        if (currentAttempt < MAX_RETRIES) {
          currentAttempt++;
          console.log(`Retrying model load (Attempt ${currentAttempt})...`);
          
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, currentAttempt)));
          
          return attemptLoadModels();
        } else {
          console.error("Failed to load models after maximum retries");
          setModelsLoaded(false);
          return false;
        }
      }
    };
  
    return attemptLoadModels();
  };

  useEffect(() => {
    loadModels();

    const hashVerificationInterval = setInterval(async () => {
      console.log("Verifying model hashes...");
      const modelHashesVerified = await verifyModelHashes(faceapi, setHashVerificationError);

      if (!modelHashesVerified) {
        console.warn("Model hash verification failed. Reloading models...");
        await loadModels();
      } else {
        console.log("Model hashes verified successfully!");
      }
    }, 10000);

    return () => clearInterval(hashVerificationInterval);
  }, []); // Run only on mount

  // Show loading screen until models are loaded
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
          {hashVerificationError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {hashVerificationError}
            </Alert>
          ) : (
            <>
              <CircularProgress size={60} />
              <Typography variant="h5" sx={{ mt: 3, color: "#000000" }}>
                Loading face recognition models...
              </Typography>
            </>
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Suspense fallback={<CircularProgress />}>
          <Header />
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
