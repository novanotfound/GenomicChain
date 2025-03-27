import { ethers } from "ethers";

export const addressToBytes32 = (address) => {
  if (!ethers.utils.isAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }
  return ethers.utils.hexZeroPad(address, 32);
};