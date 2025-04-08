const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// Endpoint to handle text file uploads to Pinata
app.post('/api/pinata/upload-text', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    console.log("helloform")

    const filePath = req.file.path;
    
    // Create form data for Pinata
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    
    // Add metadata if provided
    if (req.body.name) {
      formData.append('pinataMetadata', JSON.stringify({
        name: req.body.name || req.file.originalname
      }));
    }

    // Make request to Pinata
    const response = await axios.post('https://uploads.pinata.cloud/v3/files', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`,
        ...formData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    
    // Clean up the uploaded file
    fs.unlinkSync(filePath);
    
    // Return the Pinata response
    res.json(response.data);
  } catch (error) {
    console.error('Pinata upload error:', error.response?.data || error.message);
    
    // Clean up the uploaded file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

// Simple endpoint to check if the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload endpoint: http://localhost:${PORT}/api/pinata/upload-text`);
});
