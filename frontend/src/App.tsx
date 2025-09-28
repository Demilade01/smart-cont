import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Type definitions are automatically loaded from types/ethereum.d.ts

// SimpleStorage contract ABI (Application Binary Interface)
const contractABI = [
  "function set(uint256 x) public",
  "function get() public view returns (uint256)",
  "function getOwner() public view returns (address)",
  "event DataStored(uint256 indexed value, address indexed setter)"
];

function App() {
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [value, setValue] = useState<string>('');
  const [storedValue, setStoredValue] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  // Load contract info
  useEffect(() => {
    const loadContractInfo = async () => {
      try {
        const response = await fetch('/contract-info.json');
        const contractInfo = await response.json();

        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contractInstance = new ethers.Contract(
            contractInfo.address,
            contractABI,
            provider
          ) as any;
          setContract(contractInstance);

          // Load initial values
          const stored = await contractInstance.get();
          const contractOwner = await contractInstance.getOwner();
          setStoredValue(stored.toString());
          setOwner(contractOwner);
        }
      } catch (error) {
        console.error('Error loading contract info:', error);
      }
    };

    loadContractInfo();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleSetValue = async () => {
    if (contract && account) {
      try {
        const signer = await new ethers.BrowserProvider(window.ethereum!).getSigner();
        const contractWithSigner = contract.connect(signer);

        const tx = await (contractWithSigner as any).set(value);
        await tx.wait();

        // Update the displayed value
        const newValue = await contract.get();
        setStoredValue(newValue.toString());
        setValue('');

        alert('Value set successfully!');
      } catch (error) {
        console.error('Error setting value:', error);
        alert('Error setting value. Make sure you have enough ETH for gas.');
      }
    }
  };

  const getValue = async () => {
    if (contract) {
      try {
        const value = await contract.get();
        setStoredValue(value.toString());
      } catch (error) {
        console.error('Error getting value:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Storage Contract</h1>

        {!isConnected ? (
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        ) : (
          <div className="connected">
            <p>Connected: {account}</p>
            <div className="contract-info">
              <h3>Contract Information</h3>
              <p><strong>Owner:</strong> {owner}</p>
              <p><strong>Stored Value:</strong> {storedValue}</p>

              <div className="interaction-section">
                <h4>Set New Value</h4>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter a number"
                  className="value-input"
                />
                <button onClick={handleSetValue} className="set-btn">
                  Set Value
                </button>

                <button onClick={getValue} className="get-btn">
                  Refresh Value
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
