import web3 from '../utils/web3-instance'; // if saved in src/utils
import React, { useState } from 'react';
import axios from 'axios';

function BlockchainDataFetcher() {
  const [balance, setBalance] = useState(null);
  const [tokens, setTokens] = useState(null);

  async function fetchBlockchainData() {
    try {
      const response = await axios.get('http://localhost:3000/fetch-blockchain-data');
      setBalance(response.data.balance);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    }
  }

  async function fetchTokens() {
    try {
      const response = await axios.get('http://localhost:3000/fetch-tokens');
      setTokens(response.data.result);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  }

  return (
    <div>
      <button onClick={fetchBlockchainData}>Fetch Blockchain Data</button>
      {balance && <p>Balance: {balance} Ether</p>}

      <button onClick={fetchTokens}>Fetch Tokens</button>
      {tokens && (
        <table border={1}>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Token Symbol</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index}>
                <td>{token.tokenName}</td>
                <td>({token.tokenSymbol})</td>
                <td>{web3.utils.fromWei(token.value, 'ether')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BlockchainDataFetcher;
