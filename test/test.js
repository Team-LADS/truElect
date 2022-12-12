const { expect, should } = require("chai");
const { ethers, getChainId } = require("hardhat");

let tokenContract,votingContract;

/**
 * voter - fourthAddress
 * electionCommittee - secondAddress
 * 
 */
describe("TruElectToken and TruElectVoting Contract Deployment...", function(){
    ;
    it("should deploy the TruElectToken contract", async function(){
        //Get Contract from Contract Factory
        const TruElectTokenContract = await ethers.getContractFactory("TruElectToken");
        const [owner] = await ethers.getSigners()
        // here we deploy the contract
        const deployedTruElectTokenContract = await TruElectTokenContract.connect(owner).deploy();
    
        // Wait for it to finish deploying
        tokenContract = await deployedTruElectTokenContract.deployed();
    
        // print the address of the deployed contract
        console.log(
            "\n TruElect Contract Address:",
            tokenContract.address
        );
        console.log("passed...")
        // print the address of the deployed contract
        console.log(
            "\n should deploy the TruElectVoting contract \n Deploying..."
        );
        const TruElectVotingContract = await ethers.getContractFactory("TruElect");
        // here we deploy the contract
        const deployedTruElectVotingContract = await TruElectVotingContract.connect(owner).deploy(tokenContract.address);
    
        // Wait for it to finish deploying
        votingContract = await deployedTruElectVotingContract.deployed();
    
        // print the address of the deployed contract
        console.log(
            "\n ElectionVoting Contract Address:",
            votingContract.address
        );
        console.log("passed...")
      });
   
    it("Should mint 100 tokens to deployer address",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        ownerBalance = await tokenContract.balanceOf(owner.address);
        totalSupply = await tokenContract.totalSupply();
        console.log("totalsupply::",totalSupply," ownerbalance::",ownerBalance)
        await expect(ownerBalance).to.be.equal(totalSupply);
        console.log("passed..");



     const sdd =  await votingContract.addElectionCategory("cat1")
     const s =  await votingContract.addElectionCategory("cat2")
    //  await votingContract.addElectionCategory()
    await votingContract.registerNewCandidate('pauline',"cat1")
    
    const ss = await votingContract.getListOfCandidates()
    const sss = await votingContract.getListOfCategory()
     
     console.log({s})
     console.log({ss})
     console.log({sss})
    });
    it("Should mint tokens to address",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        contractElectionCommHead = await tokenContract.electionCommHead();
        console.log("token election committee head",contractElectionCommHead)
        minted = await tokenContract.connect(owner).mint(secondAddress.address,10);
        bal = await tokenContract.balanceOf(secondAddress.address);
        console.log("bal===",bal)
        expect(bal).to.be.equal(10)
        console.log("passed..");
    });
    it("Should not mint tokens to address if caller is not a member of the election committee or election committee head",async function(){
       
        try{
            const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
           expect(tokenContract.connect(thirdAddress).mint(secondAddress.address,10)).to.be.revertedWith("Access granted to only the election committee head or members of the election committee");
            console.log("passed..");
    

        }catch(error){
            console.log(error)
        }
    });
    it("Should mint tokens to voters if caller is election committee head or members of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
        minted = await tokenContract.connect(owner).mintToVoter([eightAddress.address,secondAddress.address,tenthAddress.address]);
        bal = await tokenContract.balanceOf(eightAddress.address);
        expect(bal).to.be.equal(ethers.utils.parseEther("1"));
        console.log("passed..");
    });
    it("Should not mint tokens to voters if caller is not the election committee head or member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
        await expect(tokenContract.connect(fourthAddress).mintToVoter([eightAddress.address,secondAddress.address,tenthAddress.address])).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
       
        console.log("passed..");
    });
    it("Should revert if there are no address to mint to ...",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
        await expect(tokenContract.connect(owner).mintToVoter([])).to.be.revertedWith("Upload array of addresses");
       
        console.log("passed..");
    });
    it("Should mint to voters...",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
        mintToVoter =await tokenContract.connect(owner).mintToVoter([fourthAddress.address]);
        bal = await tokenContract.balanceOf(fourthAddress.address);
        expect(bal).to.be.equal(ethers.utils.parseEther("1"));
        console.log("passed..");
    });
    it("Should mint to member of the election committee...",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
        const  initbal = await tokenContract.balanceOf(secondAddress.address);
        burnToken = await tokenContract.connect(secondAddress).transfer(owner.address,initbal);
        mintToVoter =await tokenContract.connect(owner).mintToVoter([secondAddress.address]);
        const  bal = await tokenContract.balanceOf(secondAddress.address);
        expect(bal).to.be.equal(ethers.utils.parseEther("1"));
        console.log("passed..");
    });

});

// ///@notice test for checking roles of voters on different states of the contract.
describe("Check Role of a voter...",function(){
    it("Should not be able to check role when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).checkVoterRole("electionCommittee",secondAddress.address)).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    it("Should be able to check role when contract is not paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role when contract is not paused.");
        paused = await votingContract.connect(owner).checkVoterRole("electionCommittee",secondAddress.address);
        const checkOutput = await paused;
        expect(checkOutput).to.be.equal(false);
        console.log('\t',"Passed ....");     
    });
    it("Should be able to check role if role is member of the election committee",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role is an member of the election committee.");
        paused = await votingContract.connect(owner).checkVoterRole("electionCommittee",secondAddress.address);
        const checkOutput = await paused;
        expect(checkOutput).to.be.equal(false);
        console.log('\t',"Passed ....");     
    });
    it("Should be able to check role if role is election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role is a election committee head.");
        paused = await votingContract.connect(owner).checkVoterRole("election committee head",secondAddress.address);
        const checkOutput = await paused;
        expect(checkOutput).to.be.equal(false);
        console.log('\t',"Passed ....");     
    });
    it("Should be able to check role if role is voter",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role is a voter.");
        uploadListOfVoters = await votingContract.connect(owner).uploadListOfVoters("voter",1,[fourthAddress.address])
        paused = await votingContract.connect(owner).checkVoterRole("voter",fourthAddress.address);
        const checkOutput = await paused;
        expect(checkOutput).to.be.equal(true);
        console.log('\t',"Passed ....");     
    });
})

///@notice test for uploading voters with different roles.
describe("Uploading voters...",function(){
    it("Should not be able to upload voter if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when caller is not the election committee head.");
        await expect(votingContract.connect(thirdAddress).uploadListOfVoters("electionCommittee",2,[secondAddress.address])).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ...."); 
    });
    it("Should be able to upload voter if caller is the election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when caller is the election committee head.");
        uploadListOfVoters = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",2,[secondAddress.address]);
        const checkOutput = await uploadListOfVoters.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ...."); 
   
    });
    it("Should not be able to upload voter if caller is not a member of the election committee ",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when caller is not the member of the election committee.");
        await expect(votingContract.connect(thirdAddress).uploadListOfVoters("electionCommittee",2,[fourthAddress.address])).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ....");
    });
    it("Should be able to upload voter if caller is a member of the election committee ",async function(){

        const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when caller is the member of the election committee.");
        //upload member of the election committee as voter
        uploadListOfVoters = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",2,[secondAddress.address]);
        uploadListOfVotersByNewelectionCommittee =await votingContract.connect(secondAddress).uploadListOfVoters("electionCommittee",2,[thirdAddress.address]);
        const checkOutput = await uploadListOfVotersByNewelectionCommittee.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");
    });
    it("Should not upload voters if there are no voters(address of potential voters)",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when there are no voters.");
        //upload member of the election committee as voter
        await expect(votingContract.connect(owner).uploadListOfVoters("electionCommittee",2,[])).to.be.revertedWith("Upload array of addresses");
        console.log('\t',"Passed ....");
    });
    it("Should not be able to upload voters when contract is paused",async function(){
        const [owner] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).uploadListOfVoters("electionCommittee",2,["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"])).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    it("Should be able to upload voters when contract is not paused",async function(){
        const [owner] = await ethers.getSigners();
        console.log('\t',"Attempting to upload voters when contract is not paused.");
        paused = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",2,["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"]);
        const checkOutput = await paused.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");     
    });
})
///@notice test for Registering candidates.
describe("Registering Candidates for an election...",function(){
    it("Should not be able to register candidate if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to register candidate when caller is not the election committee head.");
        //add category
        addCategory = await votingContract.connect(owner).addElectionCategory("chancellor");
        await expect(votingContract.connect(fourthAddress).registerNewCandidate("Godand","chancellor")).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ....");
    });
    it("Should be able to register candidate if caller is the election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to register candidate when caller is the election committee head.");
        registerNewCandidate = await votingContract.connect(owner).registerNewCandidate("Godand","chancellor");
        const checkOutput = await registerNewCandidate.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");
    });
    it("Should not be able to register candidate if caller is not a member of the election committee ",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to register candidate when caller is not a member of the election committee.");
        //remove member of the election committee role from an address
        await expect(votingContract.connect(fourthAddress).registerNewCandidate("Godand","chancellor")).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ....");
    });
    it("Should be able to register candidate if caller is a member of the election committee ",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to register candidate when caller is not a member of the election committee.");
        //remove member of the election committee role from an address
        registerNewCandidate1 =await votingContract.connect(secondAddress).registerNewCandidate("Godand","chancellor");
        const checkOutput = await registerNewCandidate1.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");
    });
    it("Should only be able to register candidate when contract is not paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to register candidate when contract is not paused.");
        paused = await votingContract.connect(owner).registerNewCandidate("Godand","chancellor");
        const checkOutput = await paused.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");  
    });
    it("Should not be able to register candidate when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).registerNewCandidate("Godand","chancellor")).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    it("Should not be able to register candidate if the category does not exit",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to register candidate when candidate category does not exist.");
       await expect(votingContract.connect(owner).registerNewCandidate("Godand","deputy chancellor")).to.be.revertedWith("Category does not exist...");
       console.log('\t',"Passed ....")
    });
})
///@notice test to Add Categories of an election.
describe("Add Categories of an election...",function(){
    it("Should only be able to add a category when contract is not paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Add Categories when contract is not paused.");
        paused = await votingContract.connect(owner).addElectionCategory("senate");
        const checkOutput = await paused.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");  
    });
    it("Should not be able to add a category when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Add Categories when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).addElectionCategory("counsellor")).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
   
    });
   
    it("Should be able to add a category if caller is a member of the election committee ",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to add a category when caller is not a member of the election committee.");
        //remove member of the election committee role from an address
        addCategory1 =await votingContract.connect(secondAddress).addElectionCategory("headboy");
        const checkOutput = await addCategory1.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ....");
    });
});
describe("Set up election...",function(){
    it("Should not be able to Set up an election if caller is not the election committee head or member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Set up election as a non election committee head....");
        await expect(votingContract.connect(fourthAddress).setUpAnElection("chancellor",[1,2],["electionCommHead","electionCommittee"])).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ....");
    });
    it("Should be able to Set up an election if caller is the election committee head or member of the election committee",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Set up election when caller is the election committee head.");
        setUpAnElection = await votingContract.connect(owner).setUpAnElection("chancellor",[1,2],["electionCommHead","electionCommittee"]);
        const checkOutput = await setUpAnElection.wait();
        expect(checkOutput.status).to.be.equal(1);
        console.log('\t',"Passed ...."); 
        
   
    });
    it("Should only be able to Set up an election when contract is not paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Set up election when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).setUpAnElection("chancellor",[1,2],["electionCommHead","electionCommittee"])).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    
    
})


///@notice test to Clear election Queue.
describe("Clear election Queue...",function(){
    it("Should not be able to clear election Queue if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to clear election Queue as a non election committee head....");
        await expect(votingContract.connect(secondAddress).resetCurrentElectionQueue()).to.be.revertedWith("Access granted to only the election committee head");
        console.log('\t',"Passed ....");
    });
    it("Should be able to clear election queue if caller is the election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to assign role as a election committee head....");
        //add address as a voter
        clearQueue = await votingContract.connect(owner).resetCurrentElectionQueue();
        const checkOutput = await clearQueue.wait();
        expect(checkOutput.status).to.equal(1);
        console.log('\t',"Passed ....");
    });

    it("Should not be able to clear election queue when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to clear election queue when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).resetCurrentElectionQueue()).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    
})
///@notice test to Start Voting Session.
describe("Start Voting Session...",function(){
    it("Should not be able to Start Voting Session if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to clear election queue as a non election committee head....");
        await expect(votingContract.connect(secondAddress).commenceVoting("chancellor")).to.be.revertedWith("Access granted to only the election committee head");
        console.log('\t',"Passed ....");
    });
    it("Should be able to Start Voting Session if caller is the election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to set up election when caller is the election committee head.");
        setUpAnElection1 = await votingContract.connect(owner).setUpAnElection("chancellor",[1,2],["electionCommHead","electionCommittee"]);

        const checkOutput = await setUpAnElection1.wait();
        expect(checkOutput.status).to.be.equal(1);
        startVotinsession = await votingContract.connect(owner).commenceVoting("chancellor");
        const tx1 = await startVotinsession.wait();
        expect(tx1.status).to.be.equal(1);
        console.log('\t',"Passed ....");
    });
    
    it("Should not be able to Start Voting Session when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Start Voting Session when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).commenceVoting("chancellor")).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    it("Should revert if category does not exist",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to start voting session for an unknown category.");
        await expect(votingContract.connect(owner).commenceVoting("local election committee head")).to.be.revertedWith("no such category exist");
        console.log('\t',"Passed ....")
    });
    
})
///@notice test to End Voting Session.
describe("End Voting Session...",function(){
    it("Should not be able to End Voting Session if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to clear election queue as a non election committee head....");
        await expect(votingContract.connect(secondAddress).concludeVoting("chancellor")).to.be.revertedWith("Access granted to only the election committee head");
        console.log('\t',"Passed ....");
    });
    it("Should be able to End Voting Session if caller is the election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to End Voting Session when caller is the election committee head.");
        setUpAnElection1 = await votingContract.connect(owner).setUpAnElection("chancellor",[1,2],["electionCommHead","electionCommittee"]);

        const checkOutput = await setUpAnElection1.wait();
        expect(checkOutput.status).to.be.equal(1);
        startVotinsession = await votingContract.connect(owner).commenceVoting("chancellor");
        const tx1 = await startVotinsession.wait();
        expect(tx1.status).to.be.equal(1);
        concludeVoting = await votingContract.connect(owner).concludeVoting("chancellor");
        const tx2 = await concludeVoting.wait();
        expect(tx2.status).to.be.equal(1);

        console.log('\t',"Passed ....");
    });
  
    it("Should not be able to End Voting Session when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Check the role when contract is paused.");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
        await expect(votingContract.connect(owner).concludeVoting("chancellor")).to.be.revertedWith("Contract is currently paused");
        console.log('\t',"Passed ....")
        const unpaused = await votingContract.connect(owner).setPaused(false);
        resetCurrentElectionQueue = await votingContract.connect(owner).resetCurrentElectionQueue();
    });
    
})
///@notice test for Voting for a Category.
describe("Voting For a Candidate Category ...",function(){
    before(async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
     
        addC = await votingContract.connect(owner).addElectionCategory("headboy");
        setUpAnElection1 = await votingContract.connect(owner).setUpAnElection("chancellor",[1,2],["electionCommHead","electionCommittee"]);
        const checkOutput = await setUpAnElection1.wait();
        expect(checkOutput.status).to.be.equal(1);
        setUpAnElection2 = await votingContract.connect(owner).setUpAnElection("headboy",[1,2],["electionCommittee","voter"]);
        const tx2 = await setUpAnElection2.wait();
        candidateCount = await votingContract.connect(owner).candidatesCount();
        console.log("candidate count. ",candidateCount)
        expect(tx2.status).to.be.equal(1);
        

    });
    it("Should not be able to  vote if caller is not Eligible to vote for a category",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        startVotinsession = await votingContract.connect(owner).commenceVoting("chancellor");
        const tx1 = await startVotinsession.wait();
        expect(tx1.status).to.be.equal(1);
        console.log('\t',"Attempting to setup election.");
        console.log('\t',"Attempting to vote.");
        await expect(votingContract.connect(fourthAddress).vote("chancellor",1)).to.be.revertedWith("You are not Qualified to vote for this category ");
        console.log('\t',"Passed ....");   
    });
    it("Should not be able to  vote if caller is not voter",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to vote.");
        await expect(votingContract.connect(fifthAddress).vote("chancellor",1)).to.be.revertedWith("You must be a registered voter");
        console.log('\t',"Passed ....");   
    });
    
    it("Should not be able to vote when contract is paused",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to vote when contract is paused.");
       //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
       await expect(votingContract.connect(owner).vote("chancellor",1)).to.be.revertedWith("Contract is currently paused");
       console.log('\t',"Passed ....")
       const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    it("Should not be able to vote when if voting has not commenced ",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to vote when voting has not commenced.");
    
       await expect(votingContract.connect(secondAddress).vote("headboy",3)).to.be.revertedWith("Voting has not commmenced for this Category");
       console.log('\t',"Passed ....")
      });
    it("Should not be able to vote if candidate is not registered for an office",async function(){
        const [owner,secondAddress,thirdAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to vote for a candidate that is not registered for an office.");
        
        const bal = await tokenContract.balanceOf(owner.address);
        console.log({bal})
       await expect(votingContract.connect(owner).vote("chancellor",10)).to.be.revertedWith("Candidate is not Registered for this Office!");
       console.log('\t',"Passed ....")
    });

    it("Should not be able to vote for a category twice",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to vote for a candidate twice.");
        const firstVote = await votingContract.connect(owner).vote("chancellor",2);
        await expect(votingContract.connect(owner).vote("chancellor",2)).to.be.revertedWith("Cannot vote twice for a category..");
        console.log('\t',"Passed ....")
    });
    it("Should not be able to vote token is less than threshold of 1*10**18",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress] = await ethers.getSigners();
        tb1= await tokenContract.balanceOf(secondAddress.address);
        console.log("balance electionCommittee ==== ",tb1);
        console.log('\t',"Attempting to burn account balance.");
        transferBalance = await tokenContract.connect(secondAddress).transfer(owner.address,ethers.utils.parseEther("1"));
        console.log("Transferred..");
        console.log('\t',"Attempting to vote with a low balance.");
        await expect(votingContract.connect(secondAddress).vote("chancellor",1)).to.be.revertedWith("YouR balance is currently not sufficient to vote. Not a voter");
        console.log('\t',"Passed ....")
        mintToAddress = await tokenContract.connect(owner).mint(secondAddress.address,ethers.utils.parseEther("10"));
      
    });
    
    it("Should not be able to vote if voting has ended for a category",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        mintToAddress = await tokenContract.connect(owner).mint(secondAddress.address,ethers.utils.parseEther("10"));
        console.log('\t',"Attempting to when voting has ended for a category");
        concludeVoting = await votingContract.connect(owner).concludeVoting("chancellor");
        voter = await votingContract.connect(owner).voters(secondAddress.address);
        console.log(voter)
        await expect(votingContract.connect(secondAddress).vote("chancellor",1)).to.be.revertedWith("Voting has ended for this Category");
        console.log('\t',"Passed ....")
    });
    
})
///@notice test for Get Winning Candidate for a Category.
describe("Get Winning Candidate for a Category ...",function(){
    
    it("Should not be able to Get Winning Candidate if votes has not been counted",async function(){
        const [owner,secondAddress] = await ethers.getSigners();

        console.log("\t","Attempting to get winning candidate when votes has not been counted");
        await expect(votingContract.connect(owner).getWinningCandidate("chancellor")).to.be.revertedWith("Only allowed after votes have been counted");
        console.log('\t',"Passed ....")
    });
    it("Should not be able to Get Winning Candidate when contract is paused",async function(){
        const [owner] = await ethers.getSigners();
        console.log("\t","Attempting to get winning candidate when contract is paused");
        concludeVoting = await votingContract.connect(owner).concludeVoting("chancellor");
        collateVotes = await votingContract.connect(owner).collateVotes("chancellor");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
        await expect(votingContract.connect(owner).getWinningCandidate("chancellor")).to.be.revertedWith("Contract is currently paused");
        console.log('\t',"Passed ....")
        const unpaused = await votingContract.connect(owner).setPaused(false);
    });
    it("Should only be able to Get Winning Candidate when result is not made public",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log("\t","Attempting to get winning candidate when result has not been made public");
        await expect(votingContract.connect(owner).getWinningCandidate("chancellor")).to.be.revertedWith("Result is not yet public");
        console.log('\t',"Passed ....");
    });
    it("Should only be able to Get Winning Candidate when result is  made public",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log("\t","Attempting to get winning candidate when contract is not paused");
         //end voting
         makeresultpublic = await votingContract.connect(owner).broadcastResult("chancellor");
        winningCandidate = await votingContract.connect(owner).getWinningCandidate("chancellor");
        console.log("here winning candidate",winningCandidate)
        expect(winningCandidate[0].id).to.equal(2);
        console.log('\t',"Passed ....");
    });
   
})
///@notice test for fetching election.
describe("Fetch election ...",function(){
    it("Should only be able to fetch election when contract is not paused",async function(){
        const [owner] = await ethers.getSigners();
        console.log("\t","Attempting to fetch election when contract is not paused");
        elections = await votingContract.connect(owner).fetchAnElection();
        expect(elections.length).to.greaterThan(1);
        console.log('\t',"Passed ....");

    });
    it("Should not be able to fetch election  when contract is paused",async function(){
        const [owner] = await ethers.getSigners();
        console.log("\t","Attempting to fetch election  when contract is paused");
        //pause the contract
        const paused = await votingContract.connect(owner).setPaused(true);
        await expect(votingContract.connect(owner).fetchAnElection()).to.be.revertedWith("Contract is currently paused");
        console.log('\t',"Passed ....")
        const unpaused = await votingContract.connect(owner).setPaused(false);
    
    });
})
///@notice test for Compiling Votes for an election.
describe("Compiling Votes for an election ...",function(){
    before("Set up election and vote",async function(){
        const [owner,secondAddress] = await ethers.getSigners();

        addCategory = await votingContract.connect(owner).addElectionCategory("senate");
        registerNewCandidate = await votingContract.connect(owner).registerNewCandidate("prince","senate");
        registerNewCandidate1 = await votingContract.connect(owner).registerNewCandidate("charming","senate");
        setUpAnElection = await votingContract.connect(owner).setUpAnElection("senate",[4,5],["electionCommHead","electionCommittee","voter"]);

        // const list = await votingContract.connect(owner).getListOfCandidates();
        // console.log("list of candidates",list);

        commenceVoting = await votingContract.connect(owner).commenceVoting("senate");
        firstVote = await  votingContract.connect(secondAddress).vote("senate",6);
        secondVote = await votingContract.connect(owner).vote("senate",5);
    })
    
    it("Should not be able to Compile Votes if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to Compiling Votes if caller is not the election committee head");
        await expect(votingContract.connect(fifthAddress).collateVotes("senate")).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"passed")
        
    });
    it("Should not be able to Compile Votes if caller is not a member of the election committee ",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to Compiling Votes if caller is not the member of the election committee");
        await expect(votingContract.connect(fourthAddress).collateVotes("senate")).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"passed")
    });
    it("Should not be able to Compiling Votes when voting session has not ended",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to Compiling Votes when voting session has not ended");
        await expect(votingContract.connect(secondAddress).collateVotes("senate")).to.be.revertedWith("This session is still active for voting");
        console.log('\t',"passed")
    });
    it("Should not be able to Compiling Votes  when contract is paused",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to Compiling Votes when contract is paused");
        concludeVoting = await votingContract.connect(owner).concludeVoting("senate");
        //compile votes 
        collateVotes = await votingContract.connect(owner).collateVotes("senate");
        //pause the contract
         const paused = await votingContract.connect(owner).setPaused(true);
         await expect(votingContract.connect(owner).getWinningCandidate("senate")).to.be.revertedWith("Contract is currently paused");
         console.log('\t',"Passed ....")
         const unpaused = await votingContract.connect(owner).setPaused(false);
   
    });
    it("Should only be able to Compiling Votes  when contract is not paused",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to Compiling Votes when contract is not paused");
        compiled = await votingContract.connect(secondAddress).collateVotes("senate");
        const checkOutput= await compiled.wait();
        expect(checkOutput.status).to.equal(1);
        console.log('\t',"passed")
    });
    
})
// ///@notice test for Pausing Contract.
describe("Pausing Contract ...",function(){
    it("Should not be able to Pause Contract if caller is not the election committee head",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        console.log("\t","Attempting to Pause Contract if caller is the election committee head");
        await expect(votingContract.connect(secondAddress).setPaused(true)).to.be.revertedWith("Access granted to only the election committee head");
        console.log('\t',"passed")
    });
    it("Should be able to Pause Contract if caller is the election committee head",async function(){
        
        const [owner] = await ethers.getSigners();
        console.log("\t","Attempting to  Pause Contract if caller is not the election committee head");
        //pause the contract
        paused = await votingContract.connect(owner).setPaused(true);
        const checkOutput = await paused.wait();
        expect(checkOutput.status).to.equal(1);
        console.log('\t',"Passed ....")
        const unpaused = await votingContract.connect(owner).setPaused(false);
  

    });
    
})
///@notice test for Making election result public.
describe("Make election result public ...",function(){
    before("Set up election and vote",async function(){
        const [owner,secondAddress] = await ethers.getSigners();
        addCategory = await votingContract.connect(owner).addElectionCategory("counsellor");
        registerNewCandidate = await votingContract.connect(owner).registerNewCandidate("prince","counsellor");
        registerNewCandidate1 = await votingContract.connect(owner).registerNewCandidate("charming","counsellor");

        const list = await votingContract.connect(owner).getListOfCandidates();
        console.log("list of candidates",list);

        setUpAnElection = await votingContract.connect(owner).setUpAnElection("counsellor",[7,8],["electionCommHead","electionCommittee","voter"]);
        commenceVoting = await votingContract.connect(owner).commenceVoting("counsellor");
        firstVote = await  votingContract.connect(secondAddress).vote("counsellor",7);
        secondVote = await votingContract.connect(owner).vote("counsellor",8);

        
    })
    it("Should not be able to make election result public if caller is not the election committee head",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to make election result public if caller is not the election committee head");
        await expect(votingContract.connect(fifthAddress).broadcastResult("senate")).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ....")
    });
    it("Should be able to make election result public if caller is the election committee head",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to  make election result public if caller is not the election committee head");
        makeresultpublic = await votingContract.connect(owner).broadcastResult("senate");
        const checkOutput = await makeresultpublic.wait();
        expect(checkOutput.status).to.equal(1);
        console.log('\t',"Passed ....")
    });
    it("Should not be able to make election result public if caller is not the member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress] = await ethers.getSigners();
         console.log("\t","Attempting to  make election result public if caller is not the member of the election committee");
        await expect(votingContract.connect(fourthAddress).broadcastResult("senate")).to.be.revertedWith("Access granted to only the election committee head or a member of the election committee");
        console.log('\t',"Passed ....")
    
    });
    it("Should be able to make election result public if caller is the member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress] = await ethers.getSigners();
        console.log("\t","Attempting to  make election result public if caller is the member of the election committee");
        makeresultpublic = await votingContract.connect(secondAddress).broadcastResult("senate");
        const checkOutput = await makeresultpublic.wait();
        expect(checkOutput.status).to.equal(1);
        console.log('\t',"Passed ....")
    });
    it("Should not be able to make election result public if the session is still active",async function(){
        const [owner] = await ethers.getSigners();
        console.log("\t","Attempting to  make election result public when session is still active");
        concludeVoting = await votingContract.connect(owner).concludeVoting("counsellor");
        await expect(votingContract.connect(owner).broadcastResult("counsellor")).to.be.revertedWith("Votes have not been counted yet");
        console.log('\t',"Passed ....")
    });
    
})

///@notice test to get candidates
describe("Candidates for elections",function(){
    it("Should be able to get candidates", async function(){
        //get signers
        const [owner] = await ethers.getSigners();    
        console.log("\t","Attempting to get candidates...");     
        getListOfCandidates = await votingContract.connect(owner).getListOfCandidates();
        expect(getListOfCandidates.length).to.be.greaterThan(1);
        console.log("passed...");
    }) 
})
///@notice test for Changing election committee head roles to voters.
describe("Change election committee head role... and concensus voting",function(){
    before("Upload electionCommittee..",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
           addVoter2 = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",3,[seventhAddress.address])
         addVoter3 = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",3,[tenthAddress.address])
       
    })
    it("Should not be able to Change election committee head role if caller is not an member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,eightAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Change election committee head role as a non member of the election committee....");
        await expect(votingContract.connect(eightAddress).changeElectionCommHead(eightAddress.address)).to.be.revertedWith("Only the election committee have access");
        console.log('\t',"Passed ....");
    });
   
    it("Should revert if address is a non voter",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Change election committee head role to a non voter....");
        await expect(votingContract.connect(secondAddress).changeElectionCommHead(ninthAddress.address)).to.be.revertedWith("Can't assign a role of election committee head to a non voter.")
        addVoter1 = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",3,[ninthAddress.address]) 
        console.log('\t',"Passed ....");
    });
    it("Should revert if votes to remove committee head is less than 80% from the member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Change election committee head role when votes to remove committee head is less than 80% from the members of the election committee");
        await expect(votingContract.connect(secondAddress).changeElectionCommHead(ninthAddress.address)).to.be.revertedWith("Requires Greater than 80% consent of the election committee to approve!") 
        console.log('\t',"Passed ....");
    });
    it("Should revert when contract is paused",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Change election committee head role when contract is paused....");
        const paused = await votingContract.connect(owner).setPaused(true);
        await expect(votingContract.connect(secondAddress).changeElectionCommHead(seventhAddress.address)).to.be.revertedWith("Contract is currently paused");
        const unpaused = await votingContract.connect(owner).setPaused(false);
        console.log('\t',"Passed ....");
    
    });
    it("Should revert if voter votes to remove committee head is not an member of the election committee",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to vote for removing committee head as a non member of the election committee....");
        await expect(votingContract.connect(eightAddress).changeElectionCommHead(seventhAddress.address)).to.be.revertedWith("Only the election committee have access");
        console.log('\t',"Passed ....");
    
    });
    it("Should revert if member of the election committee has already giving consent(no duplicate consent)",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress,ninthAddress,tenthAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to give consent twice....");
        //consent by member of the election committee
        consent1 = await votingContract.connect(secondAddress).votesToRemoveCH();
        await expect(votingContract.connect(secondAddress).votesToRemoveCH()).to.be.revertedWith("You have already consented..");
        console.log('\t',"Passed ....");

        consent2 = await votingContract.connect(seventhAddress).votesToRemoveCH();
        consent3 = await votingContract.connect(ninthAddress).votesToRemoveCH();
        consent4 = await votingContract.connect(tenthAddress).votesToRemoveCH();
        consent5 = await votingContract.connect(thirdAddress).votesToRemoveCH();
        addVoter4 = await votingContract.connect(owner).uploadListOfVoters("electionCommittee",3,[eightAddress.address])
        consent6 = await votingContract.connect(eightAddress).votesToRemoveCH();
        consent7 = await votingContract.connect(secondAddress).votesToRemoveCH();
       

        const count = await votingContract.electionCommitteeCount()
        console.log(count,"count")
        
       
    });
    it("Should be able to Change election committee head role if caller is a member of the election committee and a concensus have been reached...",async function(){
        const [owner,secondAddress,thirdAddress,fourthAddress,fifthAddress,sixthAddress,seventhAddress,eightAddress] = await ethers.getSigners();
        console.log('\t',"Attempting to Change election committee head role as a election committee head....");
        changeElectionCommHead =await votingContract.connect(secondAddress).changeElectionCommHead(thirdAddress.address);
        const checkOutput = await changeElectionCommHead.wait();
        expect(checkOutput.status).to.equal(1);
        newElectionCommHead = await votingContract.connect(owner).electionCommHead();
        expect(newElectionCommHead).to.equal(eightAddress.address);
        console.log('\t',"Passed ....");
    });
})
