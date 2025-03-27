import { ethers } from "ethers";
import genomicDataStorageABI from "../abis/genomicDataStorage.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

export const getContract = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }

  // Request access to the user's wallet
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Use BrowserProvider instead of Web3Provider
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Connect to the contract
  return new ethers.Contract(CONTRACT_ADDRESS, genomicDataStorageABI, signer);
};  