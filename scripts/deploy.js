const hre = require("hardhat");

async function main() {
    // Get the ContractFactory for GenomicDataStorage
    const GenomicDataStorage = await hre.ethers.getContractFactory("GenomicDataStorage");

    // Deploy the contract
    const contract = await GenomicDataStorage.deploy();

    // Wait for deployment to be confirmed
    await contract.waitForDeployment();

    // Log contract address
    console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
