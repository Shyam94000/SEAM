import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

const AuthenticatedProfile = ({ 
  name: initialName, 
  image: initialImage, 
  number: initialNumber, 
  currentUserAadharNumber 
}) => {
  const [editableName, setEditableName] = useState(initialName);
  const [editableNumber, setEditableNumber] = useState(initialNumber);
  const [editableImage, setEditableImage] = useState(initialImage);

  const [hasChanges, setHasChanges] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const hasNameChanged = editableName !== initialName;
    const hasNumberChanged = editableNumber !== initialNumber;
    const hasImageChanged = editableImage !== initialImage;

    setHasChanges(hasNameChanged || hasNumberChanged || hasImageChanged);
  }, [editableName, editableNumber, editableImage, initialName, initialNumber, initialImage]);

  const base64Image = editableImage?.startsWith('data:') 
    ? editableImage 
    : `data:image/jpeg;base64,${editableImage}`;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setSnackbarMessage("File size exceeds 2MB limit");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result;
      setEditableImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    // Validation
    if (!editableName.trim()) {
      setSnackbarMessage("Name cannot be empty");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!/^\d{12}$/.test(editableNumber)) {
      setSnackbarMessage("Invalid Aadhaar Number. Must be 12 digits.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', editableName.trim());
      formData.append('aadharNumber', editableNumber);
      formData.append('currentAadharNumber', currentUserAadharNumber);

      // Only append image if it has changed
      if (editableImage !== initialImage) {
        const blob = dataURLtoBlob(editableImage);
        formData.append('document', blob, 'profileImage.png');
      }

      const response = await fetch('http://localhost:3000/api/users/update-profile', {
        method: 'PUT',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setSnackbarMessage(result.message || "Profile updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        
        // Optional: Update initial values if successful
        initialName = editableName;
        initialNumber = editableNumber;
        initialImage = editableImage;
      } else {
        setSnackbarMessage(result.error || "Profile update failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Update error:', error);
      setSnackbarMessage("Network error. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  };


  // Render UI
  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        width: "600px",
        height: "auto",
        mx: "auto",
        mt: 5,
        textAlign: "center",
        borderRadius: "16px",
        background:
          "linear-gradient(180deg, white 18%, rgba(255, 190, 50, 0.8) 65%, rgba(10, 190, 40, 0.7) 100%)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
        position: "relative",
      }}
    >
      {/* Top Left Logo */}
      <Box
        component="img"
        src="/src/assets/logo-left.png"
        alt="Left Logo"
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 95,
          height: 45,
        }}
      />

      {/* Top Right Logo */}
      <Box
        component="img"
        src="/src/assets/logo-right.png"
        alt="Right Logo"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 95,
          height: 55,
        }}
      />

      {/* Success Message */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#4caf50",
        }}
      >
        Authentication Successful!
      </Typography>

      {/* Byline */}
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontWeight: "400",
          color: "#555",
          fontStyle: "bold",
          mt: 1,
        }}
      >
        Secure authentication via SEAM
      </Typography>

      {/* Welcome Text */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "500", color: "#000", mt: 2 }}
      >
        Welcome,{" "}
        <span style={{ color: "#2234a8", fontWeight: "bold" }}>{initialName}</span>!
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          gap: 3,
        }}
      >
        {/* Avatar and Details */}
        <Avatar
          src={base64Image}
          alt="Registered face"
          sx={{
            width: 200,
            height: 200,
            border: "2px solid #4caf50",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            objectFit: 'cover',
          }}
          imgProps={{
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }
          }}
        />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: "#000",
          }}
        >
          Your Aadhaar Number: {editableNumber}
        </Typography>

        {/* Update Form */}
        <Box sx={{ width: '100%', mt: 4 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Aadhaar Number"
            variant="outlined"
            fullWidth
            value={editableNumber}
            onChange={(e) => setEditableNumber(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button 
            variant="contained" 
            component="label" 
            fullWidth 
            sx={{ mb: 2 }}
          >
            Upload New Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!hasChanges || submitting}
            sx={{ mt: 3 }}
          >
            {submitting ? "Updating..." : "Submit Update Request"}
          </Button>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Paper>
  );
};

export default AuthenticatedProfile;