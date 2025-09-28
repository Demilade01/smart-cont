const { ethers: mainnetEthers } = require("hardhat");

async function deployToBaseMainnet() {
  console.log("🚀 Deploying SimpleStorage to Base Mainnet...");

  const SimpleStorage = await mainnetEthers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.waitForDeployment();

  const address = await simpleStorage.getAddress();
  console.log("✅ SimpleStorage deployed to:", address);
  console.log("📋 Contract owner:", await simpleStorage.getOwner());
  console.log("📊 Initial value:", await simpleStorage.get());

  // Save contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: address,
    network: "base",
    chainId: 8453,
    explorer: `https://basescan.org/address/${address}`,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './frontend/src/contract-info.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("💾 Contract info saved to frontend/src/contract-info.json");
  console.log("🔍 View on BaseScan:", contractInfo.explorer);
  console.log("🎉 Deployment complete!");
}

deployToBaseMainnet()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });