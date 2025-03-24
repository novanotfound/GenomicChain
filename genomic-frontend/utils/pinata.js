import axios from 'axios';

const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

export const pinata = {
  upload: {
    public: {
      file: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey
          }
        });

        return res.data.IpfsHash;
      }
    }
  }
};