import React, { useState, useEffect, lazy, Suspense } from "react";
import { Container, Box, CircularProgress, Typography, Alert } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { loadModels } from "./components/loadModels";

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
  const [loadingError, setLoadingError] = useState(null);
  const navigate = useNavigate();

  const handleAuthenticated = (user, result) => {
    if (user) {
      setAuthenticatedUser(user);
      setAuthenticationResult(result);
      navigate("/profile");
    }
  };

  useEffect(() => {
    loadModels(setModelsLoaded, setLoadingError, setHashVerificationError);
  }, []);

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
                  modelsLoaded={modelsLoaded}
                  loadingError={loadingError}
                  hashVerificationError={hashVerificationError}
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