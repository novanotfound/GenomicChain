import { keccak256 } from "js-sha3";
import { Buffer } from "buffer";

export const hashCID = (cid) => {
    return keccak256(Buffer.from(cid));
};

