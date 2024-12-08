import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { Box, Button, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LightModeIcon from "@mui/icons-material/LightMode";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReactWebcam from "react-webcam";
import { CircularProgress } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { verifyModelHashes } from './modelHashUtils';

const FaceAuthentication = ({ onAuthenticated }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facesStatus, setFacesStatus] = useState("no-face");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isValidAadhaar, setIsValidAadhaar] = useState(false);
  const [hashVerified, setHashVerified] = useState(false);
  const [hashVerificationError, setHashVerificationError] = useState(null);

  const webcamRef = useRef(null);

  useEffect(() => {
    const checkCameraAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraError(null);
      } catch (err) {
        setCameraError(
          "Camera access denied. Please allow access to your camera."
        );
      }
    };
    checkCameraAccess();
  }, []);

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ""); 
    if (/^\d{0,12}$/.test(value)) {
      const formattedValue = value
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
      setAadhaarNumber(formattedValue);

      // Basic Aadhaar number validation
      setIsValidAadhaar(value.length === 12);
    }
  };

  const handleFaceDetection = async () => {
    const videoElement = webcamRef.current?.video;
    if (!videoElement) return;

    const detections = await faceapi
      .detectAllFaces(videoElement)
      .withFaceLandmarks();

    if (detections.length === 0) {
      setFacesStatus("no-face");
    } else if (detections.length === 1) {
      setFacesStatus("one-face");
    } else {
      setFacesStatus("multiple-faces");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleFaceDetection();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  
const handlePreAuthenticationCheck = async () => {
  // Immediately set authenticating state to true
  setIsAuthenticating(true);
  setIsProcessing(true);

  try {
    // Verify model hashes before authentication
    const hashVerified = await verifyModelHashes(
      faceapi, 
      setHashVerificationError
    );
    
    if (hashVerified) {
      await handleAuthenticate();
    } else {
      throw new Error("Hash verification failed");
    }
  } catch (error) {
    console.error("Pre-authentication check failed:", error);
    alert(hashVerificationError || "Authentication check failed. Please try again.");
  } finally {

  }
};

const handleAuthenticate = async () => {
  const imageSrc = webcamRef.current.getScreenshot();
  
  try {
    const img = new Image();
    img.src = imageSrc;

    img.onload = async () => {
      try {
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detections) {
          alert("No face detected. Please try again.");
          return;
        }

        // Prepare data to send to backend
        const authData = {
          aadharNumber: aadhaarNumber.replace(/\s/g, ''), 
          descriptor: Array.from(detections.descriptor),
        };

        // Make an API call to the backend
        //const response = await fetch('https://sihseam2024mainbackend.azurewebsites.net/api/user/authenticate', {
        const response = await fetch('http://localhost:3000/api/user/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authData),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        setIsAuthenticating(false);
        setIsProcessing(false);
        
        const result = await response.json();
        if (result.authenticated) {
          onAuthenticated(result.name, result);
          alert(`Welcome, ${result.name}!`);
        } else {
          alert("Face not authenticated. Please try again.");
        }
        
      } catch (error) {
        console.error("Authentication error:", error);
        alert("Authentication failed. Please try again.");
      }
    };
  } catch (error) {
    console.error("Image processing error:", error);
    alert("Failed to process image. Please try again.");
  }
};
  
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "30px",
        gap: 4,
      }}
    >
      {/* Left Section - Aadhaar Input */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          flex: 1,
          maxWidth: "350px",
          backgroundColor: "#fafafa",
          boxShadow: 3,
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontWeight: "bold",
            borderBottom: "2px solid #00C853",
            paddingBottom: "5px",
          }}
        >
          Aadhaar Authentication
        </Typography>

        {/* Aadhaar Input */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#000", fontWeight: "bold" }}
          >
            Enter Aadhaar Number:
          </Typography>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <input
              type="text"
              value={aadhaarNumber}
              onChange={handleAadhaarChange}
              placeholder="XXXX XXXX XXXX"
              style={{
                padding: "12px",
                fontSize: "16px",
                width: "100%",
                borderRadius: "8px",
                border: `2px solid ${
                  isValidAadhaar ? "green" : aadhaarNumber ? "red" : "gray"
                }`,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                outline: "none",
                transition: "border-color 0.3s",
              }}
            />
            {aadhaarNumber && (
              <Box
                sx={{
                  position: "absolute",
                  right: "10px",
                  color: isValidAadhaar ? "green" : "red",
                  fontSize: "15px",
                }}
              >
                {isValidAadhaar ? "✔️ Valid" : "❌ Invalid"}
              </Box>
            )}
          </Box>
        </Box>

        {/* Status Cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Face Matcher Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "2px solid",
              borderColor: 1 ? "#00C853" : "orange",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#ffffff",
            }}
          >
            {1 ? (
              <Box
                sx={{ color: "#00C853", display: "flex", alignItems: "center" }}
              >
                <CheckCircleIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Face matcher is ready</Typography>
              </Box>
            ) : (
              <Box
                sx={{ color: "orange", display: "flex", alignItems: "center" }}
              >
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2">Loading face matcher...</Typography>
              </Box>
            )}
          </Box>

          {/* Face Detection Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "2px solid",
              borderColor:
                facesStatus === "no-face"
                  ? "red"
                  : facesStatus === "multiple-faces"
                  ? "orange"
                  : "#00C853",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#ffffff",
            }}
          >
            {facesStatus === "no-face" && (
              <Box sx={{ color: "red", display: "flex", alignItems: "center" }}>
                <WarningIcon sx={{ mr: 1 }} />
                <Typography variant="body2">No face detected</Typography>
              </Box>
            )}
            {facesStatus === "multiple-faces" && (
              <Box
                sx={{ color: "orange", display: "flex", alignItems: "center" }}
              >
                <WarningIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Multiple faces detected</Typography>
              </Box>
            )}
            {facesStatus === "one-face" && (
              <Box
                sx={{ color: "#00C853", display: "flex", alignItems: "center" }}
              >
                <CheckCircleIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Ready to Authenticate</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Center Section - Webcam */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          flex: 1.5,
          maxWidth: "600px",
          backgroundColor: "#fafafa",
          boxShadow: 3,
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontWeight: "bold",
            borderBottom: "2px solid #00C853",
            paddingBottom: "5px",
          }}
        >
          Face Authentication
        </Typography>

        {cameraError ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 1,
            }}
          >
            <ErrorOutlineIcon sx={{ color: "#c30010", fontSize: "50px" }} />
            <Typography
              variant="body2"
              sx={{
                color: "#c30010",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {cameraError}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "250px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: 2,
              border: "1px solid #000000",
            }}
          >
            <ReactWebcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        {/* Authenticate Button */}
        <Button
          variant="contained"
          color="success"
          onClick={handlePreAuthenticationCheck}
          disabled={
            !isValidAadhaar ||
            isAuthenticating ||
            cameraError ||
            facesStatus !== "one-face"
          }
          startIcon={isAuthenticating ? <CircularProgress size={24} /> : <CameraAltIcon />}
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "18px",
            padding: "10px",
            textTransform: "none",
            border: "1px solid #000000",
            ...(isAuthenticating && {
              backgroundColor: "#45a049", // Slightly darker green when authenticating
              color: "white",
            }),
          }}
        >
          {isAuthenticating ? "Authenticating..." : "Authenticate"}
        </Button>
      </Box>

      {/* Right Section - Instructions */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          maxWidth: "300px",
          backgroundColor: "#fafafa",
          boxShadow: 3,
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontWeight: "bold",
            borderBottom: "2px solid #00C853",
            paddingBottom: "5px",
          }}
        >
          Instructions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RemoveRedEyeIcon sx={{ color: "green" }} />
            <Typography variant="body2" sx={{ color: "#000" }}>
              Look directly at your camera.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleIcon sx={{ color: "green" }} />
            <Typography variant="body2" sx={{ color: "#000" }}>
              Position your face within the green frame.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon sx={{ color: "green" }} />
            <Typography variant="body2" sx={{ color: "#000" }}>
              Ensure good lighting on your face.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VisibilityOffIcon sx={{ color: "green" }} />
            <Typography variant="body2" sx={{ color: "#000" }}>
              Remove face coverings, eyeglasses, or masks.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FaceAuthentication;