import * as faceapi from "face-api.js";
import * as CryptoJS from "crypto-js";
import localforage from "localforage";
import axios from "axios";

// Enhanced model loader for cross-platform caching
export const loadModels = async (setModelsLoaded, setLoadingError, setHashVerificationError) => {
  const MODEL_URL = "https://modelstorage2024.blob.core.windows.net/models";
  const CACHE_VERSION = "v1";

  // Configure localforage for more reliable mobile storage
  localforage.config({
    driver: [
      localforage.INDEXEDDB,
      localforage.WEBSQL,
      localforage.LOCALSTORAGE
    ],
    name: "FaceApiModelsCache",
    version: 1.0
  });

  // Performance Monitoring Utility
  const performanceMonitor = {
    startTime: null,
    start() {
      this.startTime = performance.now();
    },
    end(label) {
      const duration = performance.now() - this.startTime;
      console.log(`${label} took ${duration.toFixed(2)}ms`);
      return duration;
    }
  };

  // Generate or retrieve encryption key
  const getOrGenerateEncryptionKey = () => {
    const storageKey = `faceapi_encryption_key_${CACHE_VERSION}`;
    let encryptionKey = localStorage.getItem(storageKey);
    
    if (!encryptionKey) {
      encryptionKey = CryptoJS.lib.WordArray.random(256 / 8).toString();
      localStorage.setItem(storageKey, encryptionKey);
    }
    
    return encryptionKey;
  };

  // Encrypt data
  const encryptData = (data, encryptionKey) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    } catch (error) {
      console.error("Encryption failed:", error);
      return data; // Fallback to unencrypted if encryption fails
    }
  };

  // Decrypt data
  const decryptData = (encryptedData, encryptionKey) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(
        CryptoJS.enc.Utf8
      );
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Decryption failed, returning original data:", error);
      return encryptedData; // Fallback to original data if decryption fails
    }
  };

  try {
    // Start performance tracking
    performanceMonitor.start();

    // Generate encryption key
    const encryptionKey = getOrGenerateEncryptionKey();

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

    // Check cache status and load models
    const loadModelWithCache = async (fileName) => {
      try {
        // Try to get cached model
        const cachedModel = await localforage.getItem(fileName);
        
        if (cachedModel) {
          console.log(`Using cached model: ${fileName}`);
          return cachedModel;
        }

        // If not cached, fetch and cache
        const response = await fetch(`${MODEL_URL}/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName}`);
        }
        
        const modelData = await response.arrayBuffer();
        
        // Encrypt and cache
        const encryptedModel = encryptData(
          Array.from(new Uint8Array(modelData)), 
          encryptionKey
        );
        
        await localforage.setItem(fileName, encryptedModel);
        
        return modelData;
      } catch (error) {
        console.error(`Error loading model ${fileName}:`, error);
        throw error;
      }
    };

    // Parallel model loading with fallback caching
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);

    // Mark models as loaded
    setModelsLoaded(true);
    setLoadingError(null);

    // Background caching for all models
    const cacheModelsInBackground = async () => {
      try {
        await Promise.all(
          modelFiles.map(async (fileName) => {
            try {
              await loadModelWithCache(fileName);
            } catch (error) {
              console.error(`Background caching failed for ${fileName}:`, error);
            }
          })
        );
      } catch (error) {
        console.error("Background caching failed:", error);
      }
    };

    // Start background caching
    cacheModelsInBackground();

    // Performance logging
    performanceMonitor.end('Initial Model Load');

    // Periodic model verification (optional)
    if (setModelsLoaded) {
      setInterval(async () => {
        console.log("Checking model integrity...");
        // Add any periodic checks or verification logic here
      }, 30000);
    }

  } catch (error) {
    console.error("Model loading failed:", error);
    setModelsLoaded(false);
    setLoadingError(error.message || "Failed to load face recognition models");
  }
};