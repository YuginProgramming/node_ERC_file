const express = require('express');
const server = express();
const Web3 = require('web3');
const fs = require('fs/promises');
const format = require('node.date-time');
const linkApi = 'https://mainnet.infura.io/v3/40c57167dfff47c38c99a2945b579dd7'
const address = '0xA145ac099E3d2e9781C9c848249E2e6b256b030D'
const provider = new Web3.providers.HttpProvider(linkApi);
const web3 = new Web3(provider);

server.get('/', (req, res) => {

  const amount = async () => {
    const ether = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(ether, 'ether');
    return balance;
  }
  const logTime = () => {
    return new Date().format("Y-M-d H:M:S")+' ';
  }
  const createLog = async () => {
    const balance = await amount();
    const time = logTime();
    await fs.appendFile('readme.log', time + balance + '\n');
    res.end(time + balance);
  };
  createLog();
});
server.listen(3000);