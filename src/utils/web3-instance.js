import Web3 from 'web3';

// Replace this with your own Ethereum provider URL (e.g., Infura)
const providerUrl = 'https://mainnet.infura.io/v3/0e73f815ab254177b0fe2016ecb83bc9';

const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

export default web3;
