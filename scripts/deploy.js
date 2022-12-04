//implement ethers from hardhat
const{ethers} = require("hardhat");
//require fs
const fs = require("fs");
const fsPath = require("path");

const tokenContractName = "TruElectToken";
const electionContractName = "TruElect";
const userContractName = 'User';

let tokenContractAddress;
let electionContractAddress;
let userContractAddress;

async function main(){
     /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so election token here is a factory for instances of our election contract.
  */
 console.log(`deploying ${tokenContractName }contract.......`)
    const TruElectTokenContract = await ethers.getContractFactory(`${tokenContractName}`);
    const [owner] = await ethers.getSigners();
     // here we deploy the contract
    const deployedTruElectTokenContract = await TruElectTokenContract.connect(owner).deploy();

    // Wait for it to finish deploying
  await deployedTruElectTokenContract.deployed();

  // print the address of the deployed contract
  console.log(
    `\n 🏵 ${tokenContractName} Contract Address:`,
    deployedTruElectTokenContract.address
  );

 console.log("deploying TruElectVoting contract.......")
    const TruElectVotingContract = await ethers.getContractFactory(`${electionContractName}`);
     // here we deploy the contract
    const deployedTruElectVotingContract = await TruElectVotingContract.connect(owner).deploy(deployedTruElectTokenContract.address);

    // Wait for it to finish deploying
  await deployedTruElectVotingContract.deployed();

  // print the address of the deployed contract
  console.log(
    `\n 🏵 ${electionContractName} Contract Address:`,
    deployedTruElectVotingContract.address
  );

 console.log("deploying User contract.......")
    const UserContract = await ethers.getContractFactory(`${userContractName}`);
     // here we deploy the contract
    const deployedUserContract = await UserContract.connect(owner).deploy();

    // Wait for it to finish deploying
  await deployedUserContract.deployed();

  // print the address of the deployed contract
  console.log(
    `\n 🏵 ${userContractName} Contract Address:`,
    deployedUserContract.address
  );

  //set address for all contract addresses
  tokenContractAddress=deployedTruElectTokenContract.address;
  electionContractAddress=deployedTruElectVotingContract.address;
  userContractAddress=deployedUserContract.address;
}

// Call the main function and catch if there is any error
main()
  .then(async() =>{ 

    //get the paths to files for user contract
    const userContractFilePath = fsPath.join(__dirname, '../artifacts/contracts/User.sol/User.json');
    const readUSerContractAbifile = fs.readFileSync(userContractFilePath, 'utf8');

    
    //get the paths to files for election contract
    const electionContractFilePath = fsPath.join(__dirname, '../artifacts/contracts/Election.sol/TruElect.json');
    const readElectionContractAbifile = fs.readFileSync(electionContractFilePath, 'utf8');

    //get the paths to files for token contract
    const tokenContractFilePath = fsPath.join(__dirname, '../artifacts/contracts/TruElect.sol/TruElectToken.json');
    const readTokenContractAbifile = fs.readFileSync(tokenContractFilePath, 'utf8');


    //capture user contract address and abi
    const captureUserAbi = JSON.parse(readUSerContractAbifile).abi
    const captureUserContractAddress = userContractAddress;


    //capture election contract address and abi
    const captureElectionAbi = JSON.parse(readElectionContractAbifile).abi
    const captureElectionContractAddress = electionContractAddress;

    //capture token contract address and abi
    const captureTokenAbi = JSON.parse(readTokenContractAbifile).abi
    const captureTokenContractAddress = tokenContractAddress;

    

    process.exit(0)})
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
