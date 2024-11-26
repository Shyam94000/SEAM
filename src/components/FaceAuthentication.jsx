import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { Box, Button, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LightModeIcon from "@mui/icons-material/LightMode";
import WarningIcon from "@mui/icons-material/Warning";
import ReactWebcam from "react-webcam";
import AuthenticatedProfile from "./AuthenticatedProfile";

const FaceAuthentication = ({ registeredFaces, onAuthenticated }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [match, setMatch] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facesStatus, setFacesStatus] = useState("no-face");
  const [instructions, setInstructions] = useState({
    camera: false,
    lighting: false,
  });

  const webcamRef = useRef(null);
  const [faceMatcher, setFaceMatcher] = useState(null);

  // Initialize face matcher when registered faces change
  useEffect(() => {
    if (registeredFaces.length > 0) {
      const descriptors = registeredFaces.map((face) => face.descriptor);
      const matcher = new faceapi.FaceMatcher(descriptors, 0.6);
      setFaceMatcher(matcher);
    }
  }, [registeredFaces]);

  // Function to handle face detection continuously
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
      setFacesStatus("multiple-faces"); // Updated for 2 or more faces
    }
  };

  // Run face detection every 500ms
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleFaceDetection();
    }, 500); // Checking for face detection every 500ms

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleAuthenticate = async () => {
    setIsAuthenticating(true);
    const imageSrc = webcamRef.current.getScreenshot(); // Get base64 image from webcam

    try {
      const img = new Image();
      img.src = process.env.NODE_ENV === "production"
        ? `/SEAM${imageSrc}`
        : imageSrc;

      img.onload = async () => {
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          if (faceMatcher) {
            const bestMatch = faceMatcher.findBestMatch(detections.descriptor);
            console.log("bestMatch.label:", bestMatch.label);
            console.log("Registered faces:", registeredFaces);

            // Ensure case-insensitive comparison and trimming spaces
            const matchedFace = registeredFaces.find(
              (face) =>
                face.name.trim().toLowerCase() ===
                bestMatch.label.trim().toLowerCase()
            );

            if (matchedFace) {
              setMatch({
                name: bestMatch.label,
                image: process.env.NODE_ENV === "production"
                  ? `/SEAM${matchedFace.image}`
                  : matchedFace.image,
              });
              onAuthenticated(bestMatch.label); // Return the match to the parent
            } else {
              console.warn("No matching face data found for", bestMatch.label);
            }
          } else {
            alert("Face matcher is not yet loaded.");
          }
        } else {
          alert("No face detected!");
        }
      };
    } catch (error) {
      console.error("Error during authentication:", error);
    }

    setIsAuthenticating(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        flexDirection: "column",
        gap: 1,
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
          borderRadius: "25px",
          backgroundColor: "#FAFAF5",
          boxShadow: 6,
          border: "2px solid lightgrey",
          width: "100%",
          maxWidth: "420px",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {cameraError && (
          <Box
            sx={{
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "8px",
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            <Typography variant="body2">{cameraError}</Typography>
          </Box>
        )}

        {!cameraError && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "300px",
              backgroundColor: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: 3,
              mb: 3,
            }}
          >
            <ReactWebcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="/image/jpeg"
              videoConstraints={{
                facingMode: "user",
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                left: "20%",
                right: "20%",
                bottom: "25%",
                border: "2px dashed #00C853",
                borderRadius: "12px",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
              }}
            ></Box>
          </Box>
        )}

        <Button
          variant="contained"
          color="success"
          onClick={handleAuthenticate}
          disabled={
            isAuthenticating || cameraError || facesStatus !== "one-face"
          }
          startIcon={<CameraAltIcon />}
          sx={{
            borderRadius: "12px",
            width: "100%",
            maxWidth: "420px",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          {isAuthenticating ? "Authenticating..." : "Authenticate"}
        </Button>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
          {facesStatus === "no-face" && (
            <Box sx={{ color: "red", display: "flex", alignItems: "center" }}>
              <WarningIcon sx={{ mr: 1 }} />
              <Typography variant="body2">No face detected</Typography>
            </Box>
          )}
          {facesStatus === "multiple-faces" && (
            <Box sx={{ color: "orange", display: "flex", alignItems: "center" }}>
              <WarningIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Multiple faces detected</Typography>
            </Box>
          )}
          {facesStatus === "one-face" && (
            <Box sx={{ color: "green", display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Ready to Authenticate</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {match && <AuthenticatedProfile name={match.name} image={match.image} />}
    </Box>
  );
};

export default FaceAuthentication;
