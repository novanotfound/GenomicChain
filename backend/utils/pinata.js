const axios = require('axios');
const FormData = require('form-data');

require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const uploadToPinata = async (file, fileName) => {
    try {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        const formData = new FormData();
        formData.append('file', file, fileName);

        const response = await axios.post(url, formData, {
            maxContentLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: API_KEY,
                pinata_secret_api_key: API_SECRET,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading to Pinata:', error.message);
        throw error;
    }
};

module.exports = uploadToPinata;