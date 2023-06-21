const hre = require("hardhat");

async function main() {
  
  const chat = await hre.ethers.deployContract("chat");

  await chat.waitForDeployment();

  const address = await chat.getAddress();
  console.log("Deployed contract address", `${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//contract address : 0x2a2DE5933DB55187Ca5E2Ec0400622FBf5FbEc0f
