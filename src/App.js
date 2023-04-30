import React from 'react';
import './App.css';
import BlockchainDataFetcher from './components/BlockchainDataFetcher';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Crypto Webapp</h1>
        <BlockchainDataFetcher />
      </header>
    </div>
  );
}

export default App;
