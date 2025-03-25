# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
```
### To start a blockchain node
```
npx hardhat node
```

### For compile the the solidity contracts
```
npx hardhat compile
```

### For deploying the contract on the node
```
npx hardhat run scripts/deploy.js --network localhost
```
```
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
