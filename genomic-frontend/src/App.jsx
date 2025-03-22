import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import { Web3Storage } from "web3.storage";
import { pinata } from "../utils/pinata";
import contractABI from "../../artifacts/contracts/GenomicDataStorage.sol/GenomicDataStorage.json"; // Import your contract ABI

const CONTRACT_ADDRESS = "contract_address";
const WEB3_STORAGE_API_KEY = "YOUR_WEB3_STORAGE_API_KEY";

export default function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [sharedUser, setSharedUser] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      console.log(contractABI);
      setProvider(web3Provider);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  const connectWallet = async () => {
    // checking meta mask existance 
    if (!provider) return;
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const signer = provider.getSigner();
    setContract(new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer));
  };

  const uploadToIPFS = async () => {
    try {
      if(!file) return alert("Select a file first");
      const upload = await pinata.upload.public.file(file)
      console.log(upload);
      alert(`File uploaded! IPFS Hash: ${upload}`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileHash = async () => {
    if (!contract || !ipfsHash) return alert("Upload a file first");
    const tx = await contract.uploadFile(ipfsHash);
    await tx.wait();
    alert("File hash stored on blockchain!");
  };

  const grantAccess = async () => {
    if (!contract || !sharedUser) return alert("Enter a valid address");
    const tx = await contract.grantAccess(ipfsHash, sharedUser);
    await tx.wait();
    alert("Access granted!");
  };

  const revokeAccess = async () => {
    if (!contract || !sharedUser) return alert("Enter a valid address");
    const tx = await contract.revokeAccess(ipfsHash, sharedUser);
    await tx.wait();
    alert("Access revoked!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold">Genomic Data Storage</h1>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}

      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-4" />
      <button onClick={uploadToIPFS} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
        Upload to IPFS
      </button>
      
      {ipfsHash && (
        <button onClick={uploadFileHash} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">
          Store Hash on Blockchain
        </button>
      )}
      
      <input
        type="text"
        placeholder="User Address"
        value={sharedUser}
        onChange={(e) => setSharedUser(e.target.value)}
        className="mt-4 p-2 border rounded w-full"
      />
      
      <button onClick={grantAccess} className="bg-purple-500 text-white px-4 py-2 rounded mt-2">
        Grant Access
      </button>
      <button onClick={revokeAccess} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
        Revoke Access
      </button>
    </div>
  );
}
