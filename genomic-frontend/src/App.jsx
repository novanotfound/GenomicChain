import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { hashCID } from "../utils/generateHash";
import { pinata } from "../utils/pinata";
import contractABI from "./abis/genomicDataStorage.json"; // Import your contract ABI
import { addressToBytes32 } from "../utils/TypeConversion";

// VITE_CONTRACT_ADDRESS= 
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState();
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [sharedUser, setSharedUser] = useState("");
  const [userFile,setUserFile] = useState(null);
  const [regUser,setRegisterUser]=useState("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
  // let contract;

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  useEffect(() => {
    if (contract) {
      console.log("Contract state updated:", contract);
    }
  }, [contract]);

  const connectWallet = async () => {
    if (!provider) return;
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    setContract(contractInstance);
  
    console.log("signer", signer);
    console.log("accounts", accounts);
    console.log("contract", contract);
  };

  const uploadToIPFS = async () => {
    try {
      // const formData = new FormData();
      // formData.append('file', file);
      // const filee = new File(["hell?o world!"], "hello.txt", { type: "text/plain" });
      const upload = await pinata.upload.public.file(file); 
      // const response = await fetch('http://localhost:3001/api/pinata/upload-text', {
      //   method: 'POST',
      //   body: formData
      // });
      console.log(upload);
      console.log("after");
      console.log(upload);
      const hashedCID = hashCID(upload.cid);
      setIpfsHash(hashedCID);
      console.log(hashedCID);
      alert(`File uploaded! IPFS Hash: ${upload}`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileHash = async () => {
    if (!ipfsHash) return alert("Upload a file first");
    if (!contract) return alert("Connect your wallet first");

    try {
      // console.log(ipfsHash.)
      console.log(typeof(ipfsHash))
      const tx = await contract.uploadFile(ipfsHash); // Send the transaction
      console.log("Transaction sent:", tx);
  
      const receipt = await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction receipt:", receipt);
  
      if (receipt.status === 1) {
        alert("File hash stored on blockchain successfully!");
      } else {
        alert("Transaction failed. Please check the blockchain for details.");
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Check the console for details.");
    }
  };

  const getFile = async () => {
    if (!contract) return alert("Connect your wallet first");
    const fileHash = await contract.getFile("0x0970de73a3f04a721ca7521a4fa24f5a0fddf9be6d287f7767d46ef257542308");
    console.log(fileHash);
    // setUserFile(fileHash);
  }

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

  const registerUser = async () => {
    if (!contract || !regUser )return alert("Enter a valid address");
  
    try {
      console.log("Registering user:", contract);
      // const bytes32Address = addressToBytes32(regUser); // Convert address to bytes32
      console.log("Bytes32 Address:", regUser);
      console.log(contract)
      const tx = await contract.registerUser("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"); // Pass bytes32 to the contract
      await tx.wait();
      console.log("user registered ", tx);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Check the console for details.");
    }
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
      <button onClick={getFile} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Get File
      </button>

      <input
        type="text"
        placeholder="register Address"
        value={regUser}
        onChange={(e) => setRegisterUser(e.target.value)}
        className="mt-4 p-2 border rounded w-full"
      />
      <button onClick={registerUser} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        register
      </button>

    </div>
  );
}




// import { useState } from "react";
// import { ethers } from "ethers";
// import {contractABI} from "./blockchain.js";

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const provider = new ethers.BrowserProvider(window.ethereum);

// async function getSigner() {
//   await window.ethereum.request({ method: "eth_requestAccounts" });
//   return provider.getSigner();
// }

// async function getContract() {
//   const signer = await getSigner();
//   return new ethers.Contract(contractAddress, contractABI.abi, signer);
// }

// function App() {
//   const [wallet, setWallet] = useState(null);
//   const [ipfsHash, setIpfsHash] = useState("");
//   const [userAddress, setUserAddress] = useState("");
//   const [retrievedHash, setRetrievedHash] = useState("");

//   const connectWallet = async () => {
//     const signer = await getSigner();
//     setWallet(await signer.getAddress());
//   };

//   const registerUser = async () => {
//     const contract = await getContract();
//     const tx = await contract.registerUser(userAddress);
//     await tx.wait();
//     alert("User Registered!");
//   };

//   const uploadFile = async () => {
//     const contract = await getContract();
//     const tx = await contract.uploadFile(ipfsHash);
//     await tx.wait();
//     alert("File Uploaded!");
//   };

//   const grantAccess = async () => {
//     const contract = await getContract();
//     const tx = await contract.grantAccess(ipfsHash, userAddress);
//     await tx.wait();
//     alert("Access Granted!");
//   };

//   const revokeAccess = async () => {
//     const contract = await getContract();
//     const tx = await contract.revokeAccess(ipfsHash, userAddress);
//     await tx.wait();
//     alert("Access Revoked!");
//   };

//   const retrieveFile = async () => {
//     try {
//       const contract = await getContract();
//       const hash = await contract.getFile(ipfsHash);
//       setRetrievedHash(hash);
//     } catch (error) {
//       alert("Access Denied!");
//     }
//   };

//   return (
//     <div>
//       <h1>Genomic Data Storage</h1>
//       <button onClick={connectWallet}>
//         {wallet ? `Connected: ${wallet}` : "Connect Wallet"}
//       </button>
//       <br />
//       <input type="text" placeholder="User Address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
//       <button onClick={registerUser}>Register User</button>
//       <br />
//       <input type="text" placeholder="Enter IPFS Hash" value={ipfsHash} onChange={(e) => setIpfsHash(e.target.value)} />
//       <button onClick={uploadFile}>Upload File</button>
//       <button onClick={grantAccess}>Grant Access</button>
//       <button onClick={revokeAccess}>Revoke Access</button>
//       <button onClick={retrieveFile}>Retrieve File</button>
//       {retrievedHash && <p>Retrieved IPFS Hash: {retrievedHash}</p>}
//     </div>
//   );
// }

// export default App;

