import { ethers } from "ethers";

export async function connectWallet() {
    if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            console.log("Connected Wallet Address:", address);
            return { provider, signer, address };
        } catch (error) {
            console.error("User rejected the request:", error);
            return null;
        }
    } else {
        alert("MetaMask not detected. Please install MetaMask.");
        return null;
    }
}
