const { ethers: sepoliaEthers } = require("hardhat");

async function deployToBaseSepolia() {
  console.log("🚀 Deploying SimpleStorage to Base Sepolia testnet...");

  const SimpleStorage = await sepoliaEthers.getContractFactory("SimpleStorage");
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
    network: "baseSepolia",
    chainId: 84532,
    explorer: `https://sepolia.basescan.org/address/${address}`,
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

deployToBaseSepolia()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });