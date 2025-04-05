const Web3 = require('web3'); // Fixed import
const contractABI = require("./VotingSystemABI.json");
const contractAddress = "YOUR_CONTRACT_ADDRESS";

const web3 = new Web3("https://goerli.infura.io/v3/0a934fa5cef0485b9b320804210d3a06");

const account = web3.eth.accounts.privateKeyToAccount("0xYOUR_PRIVATE_KEY");
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const web3 = new Web3("https://goerli.infura.io/v3/0a934fa5cef0485b9b320804210d3a06");
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function vote(candidate) {
  try {
    const tx = await contract.methods.vote(candidate).send({
      from: account.address,
      gas: 100000,
    });
    console.log("Voted! TX Hash:", tx.transactionHash);
  } catch (error) {
    console.error("Error voting:", error);
  }
}

async function getVotes(candidate) {
  try {
    const votes = await contract.methods.getVotes(candidate).call();
    console.log(`${candidate} has ${votes} votes`);
  } catch (error) {
    console.error("Error getting votes:", error);
  }
}

async function getCandidates() {
  try {
    const candidates = await contract.methods.getAllCandidates().call();
    console.log("Candidates:", candidates);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage:
getCandidates();
vote("Jay");
getVotes("Jay");