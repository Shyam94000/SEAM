import * as faceapi from "face-api.js";
import * as CryptoJS from "crypto-js";
import * as idb from "idb";
import { verifyModelHashes } from "./modelHashUtils";

// Enhanced model loader with improved security and error handling
export const loadModels = async (setModelsLoaded, setLoadingError, setHashVerificationError) => {
  const MODEL_URL = "http://localhost:3000/models"; // Adjust as necessary
  const DB_NAME = "FaceApiModelsDB";
  const STORE_NAME = "models";

  // Enhanced encryption key generation
  const generateEncryptionKey = () => {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  };

  // Robust encryption with error handling
  const encryptData = (data) => {
    try {
      const encryptionKey =
        localStorage.getItem("modelEncryptionKey") || generateEncryptionKey();

      // Store the key securely if it doesn't exist
      if (!localStorage.getItem("modelEncryptionKey")) {
        localStorage.setItem("modelEncryptionKey", encryptionKey);
      }

      return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    } catch (error) {
      console.error("Encryption failed:", error);
      throw new Error("Failed to encrypt model data");
    }
  };

  // Robust decryption with error handling
  const decryptData = (encryptedData) => {
    try {
      const encryptionKey = localStorage.getItem("modelEncryptionKey");

      if (!encryptionKey) {
        throw new Error("No encryption key found");
      }

      const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(
        CryptoJS.enc.Utf8
      );

      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Decryption failed:", error);
      throw new Error("Failed to decrypt model data");
    }
  };

  // Initialize IndexedDB with improved error handling
  const initializeDatabase = async () => {
    try {
      return await idb.openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        },
      });
    } catch (error) {
      console.error("Database initialization failed:", error);
      throw new Error("Could not initialize IndexedDB");
    }
  };

  try {
    // Initialize database
    const db = await initializeDatabase();

    // Model files to load
    const modelFiles = [
      "ssd_mobilenetv1_model-shard1",
      "ssd_mobilenetv1_model-shard2",
      "ssd_mobilenetv1_model-weights_manifest.json",
      "face_landmark_68_model-shard1",
      "face_landmark_68_model-weights_manifest.json",
      "face_recognition_model-shard1",
      "face_recognition_model-shard2",
      "face_recognition_model-weights_manifest.json",
    ];

    // Load and cache models
    for (const fileName of modelFiles) {
      // Check cache first
      const encryptedData = await db.get(STORE_NAME, fileName);

      if (!encryptedData) {
        // Fetch and cache if not in DB
        try {
          console.log(`Model ${fileName} not found in cache. Fetching from the web...`);
          const response = await fetch(`${MODEL_URL}/${fileName}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName}`);
          }
          const fileBuffer = await response.arrayBuffer();

          // Encrypt and store
          const encryptedFile = encryptData(new Uint8Array(fileBuffer).toString());
          await db.put(STORE_NAME, encryptedFile, fileName);
          console.log(`Model ${fileName} fetched and cached successfully.`);
        } catch (fetchError) {
          console.error(`Error caching ${fileName}:`, fetchError);
          // Optionally, handle individual file fetch failures
        }
      } else {
        console.log(`Model ${fileName} loaded from cache.`);
      }
    }

    // Load models into face-api.js
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);

    // Set models as loaded
    setModelsLoaded(true);
    setLoadingError(null);
  } catch (error) {
    console.error("Model loading failed:", error);
    setModelsLoaded(false);
    setLoadingError(error.message || "Failed to load face recognition models");
  }

  // Model hash verification
  if (setModelsLoaded) {
    setInterval(async () => {
      console.log("Verifying model hashes...");
      const modelHashesVerified = await verifyModelHashes(faceapi, setHashVerificationError);

      if (!modelHashesVerified) {
        console.warn("Model hash verification failed. Reloading models...");
        await loadModels();
      } else {
        console.log("Model hashes verified successfully!");
      }
    }, 10000);
  }
};
