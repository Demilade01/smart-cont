# Smart Contract App

A simple smart contract development environment with React frontend.

## What's Included

- **Hardhat**: Ethereum development framework
- **SimpleStorage Contract**: A basic smart contract for storing and retrieving values
- **React Frontend**: Web interface to interact with the contract
- **TypeScript**: Type-safe development

## Quick Start

### 1. Install Dependencies

```bash
# Install main dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Set Up Environment

```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your private key (for deployment)
# PRIVATE_KEY=your_private_key_here
```

### 3. Compile and Deploy

```bash
# Compile contracts
npm run compile

# Start local blockchain
npx hardhat node

# In another terminal, deploy to local network
npm run deploy
```

### 4. Start Frontend

```bash
# Start the React app
npm run start
```

## Available Scripts

- `npm run compile` - Compile smart contracts
- `npm run test` - Run tests
- `npm run deploy` - Deploy to local network
- `npm run deploy:base` - Deploy to Base network
- `npm run dev` - Start local blockchain and frontend together
- `npm run start` - Start React frontend only

## Contract Details

The `SimpleStorage` contract includes:
- `set(uint256 x)` - Store a value
- `get()` - Retrieve the stored value
- `getOwner()` - Get the contract owner
- Events for tracking value changes

## Networks

- **Local**: http://127.0.0.1:8545 (Hardhat local network)
- **Base Mainnet**: https://mainnet.base.org
- **Base Sepolia**: https://sepolia.base.org (testnet)

## Frontend Features

- Connect MetaMask wallet
- View contract information
- Set and get values from the contract
- Real-time updates

## Next Steps

1. Deploy to Base testnet for testing
2. Add more complex contract logic
3. Customize the frontend UI
4. Add more contracts as needed

Happy building! 🚀

