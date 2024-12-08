const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

async function uploadModels() {
  try {
    // Specify the directory containing your models
    const rootDir = path.resolve(__dirname); 
    const modelDir = path.join(rootDir, 'models');
    
    console.log(`Scanning directory: ${modelDir}`);

    // Verify directory exists
    if (!fs.existsSync(modelDir)) {
      throw new Error(`Directory does not exist: ${modelDir}`);
    }

    // Get all files in the models directory
    const modelFiles = fs.readdirSync(modelDir);

    console.log(`Found ${modelFiles.length} files to upload`);

    // Create a new FormData instance
    const formData = new FormData();

    // Add each model file to the form data with 'encrypted_' prefix
    modelFiles.forEach(fileName => {
      const filePath = path.join(modelDir, fileName);
      
      // Skip directories
      if (fs.lstatSync(filePath).isDirectory()) {
        console.log(`Skipping directory: ${fileName}`);
        return;
      }

      console.log(`Preparing to upload: ${fileName}`);
      
      const encryptedFileName = `encrypted_${fileName}`; // Add 'encrypted_' prefix once
      const fileBuffer = fs.readFileSync(filePath);
      formData.append('models', fileBuffer, encryptedFileName); // Use the encrypted filename
    });

    try {
      // Send upload request to the backend
      const response = await axios.post('http://localhost:3000/upload-model', formData, {
        headers: {
          ...formData.getHeaders()
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      console.log('Upload successful:', response.data);
    } catch (uploadError) {
      console.error('Upload failed:', uploadError.response ? uploadError.response.data : uploadError.message);
      console.error('Detailed error:', uploadError);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the upload function
uploadModels();
