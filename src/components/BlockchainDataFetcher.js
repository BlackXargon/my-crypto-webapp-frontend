import web3 from '../utils/web3-instance';
import React, { useState } from 'react';
import axios from 'axios';

function BlockchainDataFetcher() {
  const [balance, setBalance] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [address, setAddress] = useState('');

  async function fetchBlockchainData() {
    try {
      const response = await axios.post('${process.env.REACT_APP_API_URL}/fetch-blockchain-data', {
        address: address,
      });
      setBalance(response.data.balance);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    }
  }

  /*
  async function fetchTokens() {
    try {
      const response = await axios.post('http://localhost:3000/fetch-tokens', {
        address: address,
      });
      console.log("Response data:", response.data); // Add this line
      // setTokens(response.data.result);
      setTokens(Array.isArray(response.data.result) ? response.data.result : []);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  }*/

  // more updated fetchtokens before changing methodology to fetch token balance 
  const fetchTokens = async () => {
    try {
      let resolvedAddress = address;

      // Check if the address is an ENS domain
      if (address.endsWith('.eth')) {
        resolvedAddress = await web3.eth.ens.getAddress(address);
      }

      // const response = await axios.post(`http://localhost:3000/fetch-tokens?address=${resolvedAddress}`);
      // change to get instead of post
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-tokens?address=${resolvedAddress}`);

      console.log('Response data:', response.data); // Add this line to log the response data
      // const tokens = response.data.result || [];
      // const tokens = Array.isArray(response.data.result) ? response.data.result : [];
      
      const tokens = Array.isArray(response.data.result)
      ? response.data.result.map((token) => ({
          ...token,
          transactionHash: token.hash, // Add the transaction hash to each token object
        }))
      : [];
      

      setTokens(tokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ fontSize: '1.5rem', padding: '10px', width: '100%' }} // Updated style
      />
      <button 
        onClick={fetchBlockchainData}
        style={{ fontSize: '1.5rem', padding: '10px', margin: '10px' }} // Updated style
      >
        Fetch Blockchain Data
      </button>
      {balance && <p>Balance: {balance} Ether</p>}

      <button 
        onClick={fetchTokens}
        style={{ fontSize: '1.5rem', padding: '10px', margin: '10px' }} // Updated style
      >
        Fetch Tokens
      </button>
      {Array.isArray(tokens) && (
        <table border = '1' style = {{ fontSize: '0.8rem'}}>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Token Symbol</th>
              <th>Balance</th>
              <th>Contract Address</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {console.log('Tokens:', tokens)} {/* Add this line to log the tokens variable */}
            {tokens.map((token, index) => (
              <tr key={index}>
                <td>{token.tokenName}</td>
                <td>({token.tokenSymbol})</td>
                <td>{web3.utils.fromWei(token.value, 'ether')}</td>
                <td>
                  <a
                    href={`https://etherscan.io/address/${token.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4DA8DA' }}
                  >
                    {token.contractAddress}
                  </a>
                </td>
                <td>
                  {/* Update the URL to show transaction hash */}
                  <a
                    href={`https://etherscan.io/tx/${token.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4DA8DA' }}
                  >
                    {token.transactionHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BlockchainDataFetcher;
