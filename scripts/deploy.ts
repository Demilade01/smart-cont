const { ethers: localEthers } = require("hardhat");

async function deployLocal() {
  console.log("Deploying SimpleStorage contract...");

  const SimpleStorage = await localEthers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.waitForDeployment();

  const address = await simpleStorage.getAddress();
  console.log("SimpleStorage deployed to:", address);
  console.log("Contract owner:", await simpleStorage.getOwner());
  console.log("Initial value:", await simpleStorage.get());

  // Save contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: address,
    network: "localhost",
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './frontend/src/contract-info.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract info saved to frontend/src/contract-info.json");
}

deployLocal()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });