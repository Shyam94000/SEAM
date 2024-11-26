import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"; // Import Router
import FaceAuthentication from "./components/FaceAuthentication";
import AuthenticatedProfile from "./components/AuthenticatedProfile";
import Header from "./components/Header";

function App() {
  const [mode, setMode] = useState(1); // Authentication mode
  const [registeredFaces, setRegisteredFaces] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.NODE_ENV === 'production' 
        ? '/SEAM/models'  // GitHub Pages path
        : '/models';      // Local development path
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

  useEffect(() => {
    const loadDataset = async () => {
      if (modelsLoaded) {
        try {
          const response = await fetch("/dataset/names.json");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Raw dataset:', data);  // Log raw response
          const faceDescriptors = [];

          for (let item of data) {
            const img = await faceapi.fetchImage(item.image);
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();

            if (detections) {
              faceDescriptors.push({
                descriptor: detections.descriptor,
                name: item.name,
                image: item.image,
              });
            }
          }
          setRegisteredFaces(faceDescriptors);
        } catch (error) {
          console.error("Error loading dataset:", error);
        }
      }
    };

    loadDataset();
  }, [modelsLoaded]);

  const handleAuthenticated = (match) => {
    setAuthenticatedUser(match);
    navigate("/profile"); // Redirect to profile page
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
          <Typography variant="h5" sx={{ mt: 3 }}>
            Loading face recognition models...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Header />
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}></Box>
        <Routes>
          <Route
            path="/"
            element={
              mode === 1 && (
                <FaceAuthentication
                  registeredFaces={registeredFaces}
                  onAuthenticated={handleAuthenticated}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              authenticatedUser ? (
                <AuthenticatedProfile
                  name={authenticatedUser}
                  image={
                    registeredFaces.find(
                      (face) => face.name === authenticatedUser
                    )?.image
                  }
                />
              ) : (
                <Typography variant="h5" sx={{ textAlign: "center", mt: 5 }}>
                  Unauthorized Access
                </Typography>
              )
            }
          />
        </Routes>
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
