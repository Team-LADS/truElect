# truElect Dapp

<!-- <p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1LB_g7gQyeFogizQaGCBNi85a1kXp3tYH" alt="site"/>
</p> -->

> ## Table of contents
- [Overview](#overview)
- [Core Features Implemented](#core-features-implemented)
- [Technologies](#technologies)
- [Repo Setup](#repo-setup)
- [Requirements](#requirements)
- [Setup the Project](#setup-the-project)
  - [Install Hardhat](#install-hardhat)
  - [Env Setup](#env-setup)
  - [Setup Hardhat.config](#setup-hardhatconfig)
- [Create the SmartContract](#create-the-smartcontract)
  - [Collate](#collate)
  - [Deploy](#deploy)
  - [Verify](#verify)
- [Setup the Frontend](#setup-the-frontend)
  - [Install Dependencies](#install-dependencies)
  <!-- - [Steps to host the live site on Vercel](#steps-to-host-the-live-site-on-vercel) -->
- [Testing the Smartcontract](#testing-the-smartcontract)
<!-- - [TruElect Contract Address](#TruElect-contract-address)
- [Live Link](#live-link) -->
- [Contributors](#contributors)
- [Contributing to the project](#contributing-to-the-project)
#
> ## Overview
<p align="justify">
TruElect as an app which can be used to setup an election. The major voters here include the voters and the members of the election committee, who are involved in stetting up the election.
</p>


#
> ## Core Features Implemented

- Deployment on polygon for speed, gas fees & optimization.
- Batch upload voter addresses and mint certain amount of tokens to voters during upload.
- Restrict the voting power of voters to only those who have a token.
- Restrict the power to set up and collate votes to only the election committee head and electoral committee.
- Set up multiple elections at the same time.
- Restrict the ability for anyone who isn't a authorized voter to vote.
- Allow eligible voters to vote for candidates in different election categories simultaneously.
- Limit authorized voters from voting in specific elections, for example voters can't vote in an election for assigning electoral committee.
- Register candidates to contest for specific positions.
- Restrict authorized voters from voting multiple times for different candidates in the same election category.
- Prevent voters from voting for a candidate that doesn't exist for that category.
- Allow authorized voters to view history of past elections.
- Allow for the election committee to view the election queue.
- Restrict the beginning and end of a voting session to only the election committee head.
- Collate votes for different election categories.
- Grant ability to broadcast the election results to the election committee head and election committee.
- Restrict the ability of the voters to view the election results until it is broadcasted.
- Change the current election committee head based on a consensus of above 80% vote from the election committee. 
- Pause and unpause the contract in the event of a vulnerability or a security breach. This pauses the contract functionality so the vulnerability can't be exploited until the problem has been resolved.
- Unit testing to ensure that all the codes meet the quality standards and the functions return the expected output. Test coverage shows us the extent of how much of our codes are covered by tests. We ideally aim for 100% coverage.
- This documentation provides information about the codebase and their implementation for both technical and non technical people. 


</p>

#
> ## Technologies
| <b><u>Stack</u></b> | <b><u>Usage</u></b> |
| :------------------ | :------------------ |
| **`Solidity`**      | Smart contract      |
| **`React JS`**      | Frontend            |

#
> ## Repo Setup

<p align="justify">
To setup the repo, first fork the Team-LADS truElect repo, then clone the forked repository to create a copy on your local machine.
</p>

    $ git clone https://github.com/<your-forked-repo>/truElect.git

<p align="justify">
Change directory to the cloned repo and set the Team-LADS truElect repository as the "upstream" and your forked repository as the "origin" using gitbash.
</p>

    $ git remote add upstream https://github.com/Team-LADS/truElect.git

#

> ## Requirements
#
- Hardhat
- Alchemy key
- Metamask key
- Polygonscan.com API Url
- Node JS
#
> ## Setup the Project
**`*Note:`**

<p align="justify">
This project was setup on a windows 10 system using the gitbash terminal. Some of the commands used may not work with the VScode terminal, command prompt or powershell.
</p>

The steps involved are outlined below:-
#
> ### Install Hardhat
The first step involves cloning and installing hardhat.
```shell
# cd truElect

$ npm i -D hardhat

$ npm install

$ npm i --save-dev "@nomiclabs/hardhat-waffle" "ethereum-waffle" "chai" "@nomiclabs/hardhat-ethers" "ethers" "web3" "@nomiclabs/hardhat-web3" "@nomiclabs/hardhat-etherscan" "@openzeppelin/contracts" 

$ npm i --save-dev "dotenv" "@tenderly/hardhat-tenderly" "hardhat-gas-reporter" "hardhat-deploy" "ganache" "ganache-cli" "solidity-coverage" "apexcharts" "react-apexcharts" "react-router-dom"
```
> ### Env Setup
 Next create a `.env` file by using the sample.env. Retrieve your information from the relevant sites and input the information where needed in the `.env` file.

`To retrieve your metamask private key.`
- Open your account details by clicking on the three dots on the metamask extension on your chrome browser
- Click on export private key
- Verify your password
- Copy your private key and place it in the .env file

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1oDl0IbicD7LhNOcYUbGzBYTJdduWim1t" alt="metamask"/>
</p>

#
`To retrieve your alchemy key.`
- Login to your account on [alchemy](https://www.alchemy.com/)
- Once you're redirected to your [dashboard](https://dashboard.alchemyapi.io/), click on create app.
- Fill in the relevant details especially the chain and network
- Once the app has been created, click on view key.
- Copy the HTTP and place it in the .env file.

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1vPvT5LJRJy6B8hSi_3mPo16wC4u6MnEK" alt="alchemy"/>
  
</p>

#
`To retrieve your polygonscan key.`
- Login to [polygonscan](https://polygonscan.com/) and hover over the dropdown arrow for your profile on the navbar.
- Click on API keys and add to create a new project (optional step).
- Once the project has been created, click on the copy button to copy the API key.
- Paste it in the .env file

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1x1h2DqgWNGFzx47sNAVY0uUk_WaJx3wi" alt="polygon key"/>
</p>

#
> ### Setup Hardhat.config


Below is the setup for the hardhat.config.json

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=1-vWH8_zI8DTzvnRM4gcwX2HWsHuCd0O0" alt="hardhat"/>
</p>

#
> ## Create the SmartContract
  - First write the Smartcontract codes within the contracts folder.
  - The next step involves the compilation, deployment and verification of the contract on the testnet.

> ### Compile
- To compile the smartcontract before deployment:
```
$ npx hardhat compile
```
#
> ### Deploy
- To deploy the smartcontract:
```
$ npx hardhat run scripts/deploy.js --network mumbai
```
#
> ### Verify
- To verify the smartcontract:
<!-- ```
$ npx hardhat verify 0xD6c7Bc7089DBe4DC6D493E35eaC3dAf5b18FC04d 0xC291B856723080177f983CB32C275D1e56f91841 --network mumbai
``` -->
- Note for verification, the first address is the TruElectToken address, while the second is the TruElect address.

#
> ## Setup the Frontend
- First run the frontend on your local server to ensure it's fully functional before building for production.
#
> ### Install Dependencies
- Setup and install dependencies

```shell
# cd frontend
# install tailwind, postcss and autoprefixer

$ npm i -D tailwindcss postcss autoprefixer @iconify/react

$ npx tailwindcss init -p

$ npm install

# start the server
$ npm start
```
<!-- # $ npm run dev -->
Open a separate terminal
```
$ npm run tailwind
```

<!-- > ### Steps to host the live site on Vercel
- Create an account on [vercel](https://vercel.com/) and authorize your [GitHub](https://github.com/Polygon-Team-LADS) account.

- Once you're redirected to the Dashboard, click on the drop down menu and select `Add GitHub Org or Account`.

- In the pop-up window, select the install option.

- Once installation is completed, return to the dashboard and click `new project`.

- Select the Team-LADS organization and select the TruElect repo to import the project.

- Enter the relevant details and click `Deploy`.
 -->

#
> ## Testing the Smartcontract

- Coverage is used to view the percentage of the code required by tests. Unittests were implemented to ensure that the code functions without errors
#
**`Coverage Test`**
- To test the smartcontract, first open a terminal and run the following command:
<!-- 
- First install Solidity Coverage
```
  $ npm i solidity-coverage
``` -->
- Add `require('solidity-coverage')` to hardhat.config.json

<!-- - Install Ganache
``` 
  $ npm i ganache-cli
```  -->
- Run coverage
```
$ npx hardhat coverage --network localhost

# if you get errors and you want to trace the error in the terminal
$ npx hardhat coverage --network localhost --show-stack-traces
```
#

<p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=16zXW2QHBBinyC0adq1Cd41YUD1grjR1X" alt="coverage tests"/>
</p>


<!-- #
> ## TruElect Contract Address

- https://mumbai.polygonscan.com/address/0x427Db0A29d81C123228083418B99D2a69462D054#code
# 
#### Token Contract
- https://mumbai.polygonscan.com/address/0x4B4d118567645FFfA9aF12F6D32a52EB91726f73#code
# 

#### User contract
- https://mumbai.polygonscan.com/address/0x64BC9f839C767A3A02b6F4b3d03BFC7303b236b2#code
# 

> ## Live Link
  
- https://truelect.netilfy.app/ -->
#

> ## Contributors

This Project was created by the members of Team-LADS during the Polygon Internship.

``` 
- KordJs (Ajibadeabd@gmail.com)
- Sancrystal (anyanwu.amanzearthur@gmail.com)
- PaulineB (paulinebanye@gmail.com)
```
<!-- - Godand (Godhanded0@gmail.com) -->

<!-- <p align="center" width="100%">
  <img src="https://drive.google.com/uc?export=view&id=17igBfE_fikN2_NGJ0am0IaK8V1IW3Q-8" alt="Team-LADS"/>
</p> -->

#
> ## Contributing to the project

If you find something worth contributing, please fork the repo, make a pull request and add valid and well-reasoned explanations about your changes or comments.

Before adding a pull request, please note:

- This is an open source project.
- Your contributions should be inviting and clear.
- Any additions should be relevant.
- New features should be easy to contribute to.

All **`suggestions`** are welcome!
#
> ##### README Created by `pauline-banye` for Team-LADS