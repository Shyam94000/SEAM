// src/modelHashUtils.js

import axios from "axios";

// Function to calculate the hash of model weights
export const calculateHash = async (url) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Use the Web Crypto API (available in the browser)
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", arrayBuffer);

  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// Function to verify model hashes by comparing local and server-side hashes
export const verifyModelHashes = async (faceapi, setHashVerificationError) => {
  try {
    // Fetch server-side hashes
    const response = await axios.get("http://localhost:3000/model-hash");
    const serverHashes = response.data;

    const loadedModels = {
      ssdMobilenetv1: [
        'ssd_mobilenetv1_model-shard1',
        'ssd_mobilenetv1_model-shard2',
        'ssd_mobilenetv1_model-weights_manifest.json'
      ],
      faceLandmark68Net: [
        'face_landmark_68_model-shard1',
        'face_landmark_68_model-weights_manifest.json'
      ],
      faceRecognitionNet: [
        'face_recognition_model-shard1',
        'face_recognition_model-shard2',
        'face_recognition_model-weights_manifest.json'
      ]
    };

    // Iterate over the models
    for (const [modelName, modelFiles] of Object.entries(loadedModels)) {
      // Check if model is loaded
      const modelInstance = faceapi.nets[modelName];
      if (!modelInstance || !modelInstance.isLoaded) {
        throw new Error(`Model ${modelName} is not loaded`);
      }

      // Iterate over the model files and compare their hashes
      for (const fileName of modelFiles) {
        const modelUrl = `http://localhost:3000/models/${fileName}`;

        // Calculate the hash of the local model file
        const localHash = await calculateHash(modelUrl);

        // Fetch the server-side hash for the current model file
        const serverHash = serverHashes[fileName];

        // Compare the local hash with the server-side hash
        if (localHash !== serverHash) {
          throw new Error(`Hash mismatch for ${fileName}`);
        }
      }
    }

    console.log("All loaded models match server hashes!");
    return true;
  } catch (error) {
    console.error("Hash verification failed:", error);
    setHashVerificationError("Failed to verify model hashes");
    return false;
  }
};