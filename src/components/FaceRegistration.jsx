import React, { useState } from "react";
import * as faceapi from "face-api.js";
import ReactWebcam from "react-webcam";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

function FaceRegistration({ onRegister }) {
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Webcam component reference
  const webcamRef = React.useRef(null);

  const handleRegister = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    setIsRegistering(true);
    const imageSrc = webcamRef.current.getScreenshot(); // Get base64 image from webcam

    try {
      const img = new Image();
      img.src = imageSrc; // Create Image element from base64 string

      img.onload = async () => {
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          const faceData = {
            name,
            descriptor: Array.from(detections.descriptor),
          };
          onRegister(faceData); // Pass the face data to the parent component
          setName("");
          alert("Face registered successfully!");
        } else {
          alert("No face detected. Please try again.");
        }
      };
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration");
    }

    setIsRegistering(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Face Registration
      </Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box>
        <ReactWebcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width="640"
          height="480"
          videoConstraints={{
            facingMode: "user",
          }}
        />
      </Box>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          disabled={isRegistering}
        >
          {isRegistering ? "Registering..." : "Register Face"}
        </Button>
      </Paper>
    </Box>
  );
}

export default FaceRegistration;
