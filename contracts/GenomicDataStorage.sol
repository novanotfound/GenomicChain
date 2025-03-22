// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GenomicDataStorage {
    address public immutable admin;
    
    enum Role { NormalUser, Admin }
    
    struct User {
        Role role;
        bool exists;
    }
    
    struct File {
        string ipfsHash;
        address owner;
        mapping(address => bool) sharedWith;
    }
    
    mapping(address => User) public users;
    mapping(string => File) private files;
    
    // evvent is used to log the data 
    // Without indexed, you can see event data but cannot filter by specific values efficiently.
    // Whenever ipfs is generated, this event is emitted.
    event FileUploaded(address indexed user, string ipfsHash);
    event AccessGranted(address indexed owner, address indexed sharedUser, string ipfsHash);
    event AccessRevoked(address indexed owner, address indexed sharedUser, string ipfsHash);
    
    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Admin, "Only admin can perform this action");
        _;
    }
    
    modifier onlyUser() {
        require(users[msg.sender].exists, "User does not exist");
        _;
    }
    
    constructor() {
        admin = msg.sender;
        users[msg.sender] = User(Role.Admin, true);
    }
    
    function registerUser(address userAddress) external onlyAdmin {
        require(!users[userAddress].exists, "User already registered");
        users[userAddress] = User(Role.NormalUser, true);
    }
    
    function uploadFile(string memory ipfsHash) external onlyUser {
        require(bytes(files[ipfsHash].ipfsHash).length == 0, "File already exists");
        
        files[ipfsHash].ipfsHash = ipfsHash;
        files[ipfsHash].owner = msg.sender;
        
        emit FileUploaded(msg.sender, ipfsHash);
    }
    
    function grantAccess(string memory ipfsHash, address sharedUser) external onlyUser {
        require(files[ipfsHash].owner == msg.sender, "Only owner can grant access");
        require(users[sharedUser].exists, "Shared user must be registered");
        
        // sharing that particular file 
        files[ipfsHash].sharedWith[sharedUser] = true;
        
        emit AccessGranted(msg.sender, sharedUser, ipfsHash);
    }
    
    function revokeAccess(string memory ipfsHash, address sharedUser) external onlyUser {
        require(files[ipfsHash].owner == msg.sender, "Only owner can revoke access");
        require(files[ipfsHash].sharedWith[sharedUser], "User does not have access");
        
        files[ipfsHash].sharedWith[sharedUser] = false;
        
        emit AccessRevoked(msg.sender, sharedUser, ipfsHash);
    }
    
    function getFile(string memory ipfsHash) external view onlyUser returns (string memory) {
        require(files[ipfsHash].owner == msg.sender || files[ipfsHash].sharedWith[msg.sender], "Access denied");
        return files[ipfsHash].ipfsHash;
    }
}
