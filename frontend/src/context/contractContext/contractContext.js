import { useEffect, useState, createContext ,useContext} from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { truElectContractABI, truElectContractAddress } from "../../utils/constants";
import { truElectTokenABI, truElectTokenAddress } from "../../utils/tokenConstants";

export const ConnectContext = createContext();

const { ethereum } = window;

const notifyError = (str) => toast.error(str, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });;

const notifyWarning = (str)=> toast.warn(str, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });

const notifySuccess = (str)=> toast.success(str, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });
const notifyInfo = (str)=>    toast.info(str, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });


const truElectContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const truElectContract = new ethers.Contract(truElectContractAddress, truElectContractABI, signer);
 
  return truElectContract;
};
const truElectContractToken = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const truElectToken = new ethers.Contract(truElectTokenAddress, truElectTokenABI, signer);
 
  return truElectToken;
};


const register = async(cid) =>{
  const contract = truElectContract();
  notifyInfo("Registering....");

  try {
    const result =await contract.registerUserProfile(cid, {gasLimit:300000});
    notifySuccess("Registered successfully");
   return result
   }
  catch(error){
   notifyError("error,"+ error.message);
    console.log(error)
  
  }

}

const getUserProfile = async() =>{
  const contract = truElectContract();
  notifyInfo("Fetching User....");

  try {
    const result =await contract.getUserProfile( {gasLimit:300000});
    notifySuccess("User Fetched successfully");
   return result
   }
  catch(error){
   notifyError("error,"+ error.message);
    console.log(error)
  
  }
} 

const uploadVoter = async(_role,votingWeight,Arr) => {
  const contract = truElectContract();
  notifyInfo("uploading Voter");
 try {
   const result =await contract.uploadListOfVoters(_role, votingWeight, Arr, {gasLimit:600000});
   notifySuccess("Voters, uploaded");
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
 
 }
}
const setupElection = async(_category, idArr, allowanceArr) => {
  const contract = truElectContract();
  notifyInfo("setting up election");
 try {
   const result =await contract.setUpAnElection(_category, idArr, allowanceArr, {gasLimit:300000});
   notifyInfo("election is ready for approval");
  return result
  }
 catch(error){
   console.log(error)
  notifyError("error,"+ error.message);
 
 }
}
const mint = async(role, amount, Arr) => {
  const contract = truElectContractToken();
  notifyInfo("minting...");
 try {
   const result =await contract.mintToVoter(Arr, {gasLimit:300000});
   notifyInfo("minting, successful");
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
 
 }
}

const clear = async() => {
  const contract = truElectContract();
  
 try {
  notifyWarning('Clearing Election queue...');
  await contract.resetCurrentElectionQueue();

 
  }
 catch(error){
   console.log(error)
   notifyError("error,"+ error.message);
 
 }
}


const startVoting = async(_category) => {
  const contract = truElectContract();

 try {

   const result =await contract.commenceVoting(_category, {gasLimit:600000});
    notifyInfo(`Voting for ${_category} has commenced`)
  return result
  }
 catch(error){
  notifyError("error,"+ error.message);
   console.log(error)
 
 }
}
const endVoting = async(_category) => {
  const contract = truElectContract();
  
 try {
  await contract.concludeVoting(_category, {gasLimit:600000});
  notifyInfo('Voting ' + _category + ' has Ended')
 
  }
 catch(error){
  notifyError("error,"+ error.message);
 
 }
}
const publish = async(_category) => {
  const contract = truElectContract();
  notifyInfo(`Publishing results for '${_category}'`)
 try {
   const result =await contract.broadcastResult(_category, {gasLimit:600000});
   notifySuccess(`Results for '${_category}' have been published`);
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
 
 }
}

const RegisterCandidate = async(name, _category) => {
  const contract = truElectContract();
  notifyInfo("registering candidate for "+ _category + " election");
 try {
   const result =await contract.registerNewCandidate(name, _category, {gasLimit:300000});
   notifySuccess("candidate added");
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
 
 }
}
const candidateName = async(id) => {
  const contract = truElectContract();
  
 try {
   const result =await contract.getCandidateName(id, {gasLimit:300000});
   notifySuccess('Fetched successfully')
  //  console.log(result)
  return result
  }
 catch(error){
  notifyError("error,"+ error.message);
 
 }
}
const AddCategory = async(_category) => {
  const contract = truElectContract();
  notifyInfo("adding category");
 try {
   const result =await contract.addElectionCategory(_category);
   
   notifySuccess("category added");

  return result
  }
 catch(error){
  notifyError("error,"+ error.message);
   console.log(error)
 
 }
}

const changeTokenChairman = async(addr) => {
  const contract = truElectContractToken();
  notifyInfo("changing chairman in token...");
 try {
   const result =await contract.changeElectionCommHead(addr);
   notifySuccess("changed token chairman");
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
 
 }
}

const updateChairman = async(addr) => {
  const contract = truElectContract();
  notifyInfo("changing Electorial body Chairman...");
 try {
   const result =await contract.changeElectionCommHead(addr);
   if(result){
    await changeTokenChairman(addr)
  }
   notifySuccess("Electorial body Chairman changed..");

  return result
  }
 catch(error){
  notifyError("error,"+ error.message);
   console.log(error)
 
 }
}
const voteConsensus = async() => {
  const contract = truElectContract();
  notifyInfo("voting for changing chairman")
 try {
   const result =await contract.votesToRemoveCH();
   
   notifySuccess("You have consented")

  return result
  }
 catch(error){
  notifyError("error,"+ error.message);
   console.log(error)
 
 }
}

const electionList = async() => {
  const contract = truElectContract();
  
 try {
    notifyInfo('Fetching election')
   const result =await contract.fetchAnElection();
    notifySuccess('Election has been fetched successfully')
  return result
  }
 catch(error){
   console.log(error)
   notifyError("error,"+ error.message);
  
 }
}
const candidateList = async() => {
  const contract = truElectContract();
  
 try {
  notifyInfo('Fetching Candidates list')
   const result =await contract.getListOfCandidates();
  notifySuccess('Candidates List successfully fetched')
  return result
  }
 catch(error){
   console.log(error)
   notifyError("error,"+ error.message);
  
 }
}

const Compile = async(_category) => {
  const contract = truElectContract();
  notifyInfo("collating Votes result for " + _category);
 try {
   const result =await contract.collateVotes(_category, {gasLimit:300000} );
   notifySuccess( _category + " election has been added");
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
  
 }
}
const Voting = async(_category, id) => {
  const contract = truElectContract();
  notifyInfo("Voting...");
 try {
   const result =await contract.vote(_category, id, {gasLimit:300000});
   notifySuccess("Voting is successful for " + _category );
  return result
  }
 catch(error){
 notifyError("error,"+ error.message);
   console.log(error)
  
 }
}
const getResult = async(_category) => {
  const contract = truElectContract();
  
 try {
  notifyInfo('Fetching election result')
   const result =await contract.getWinningCandidate(_category);
  notifySuccess('Results are successfully fetched')
  return result
  }
 catch(error){
   console.log(error)
   notifyError("error,"+ error.message);
  
 }
}
const check = async(role, addr) => {
  const contract = truElectContract();
  console.log('got here',role)
 try {
  notifyInfo('Checking voter role')
   const result =await contract.checkVoterRole(role, addr);
   console.log(result)
  notifySuccess('Successfully checked')
  return result
  }
 catch(error){
   console.log(error)
   notifyError("error,"+ error.message);
  
 }
}

const pauseContract = async(value) => {
  const contract = truElectContract();
  
 try {
  notifyWarning('Pausing Contract ...')
   const result =await contract.setPaused(value);
  notifySuccess('Contract Successfully Paused')
  return result
  }
 catch(error){
   console.log(error)
   notifyError("error,"+ error.message);
  
 }
}


export const ConnectProvider = ({ children }) =>{
    const [currentAccount, setCurrentAccount] = useState("");
    const [networkConnected, setnetworkConnected] = useState("");
    const checkIfWalletIsConnect = async () => {
      
      try {
        if (!ethereum) notifyWarning("Please install MetaMask.");
        if (!ethereum) return alert("Please install MetaMask.");
       // const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length) {
        //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
        setCurrentAccount(accounts[0]);
          notifySuccess('Wallet connected')
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const findNetwork = async() => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const network = await provider.getNetwork();
       const chainId = network.chainId;

       if (chainId ===1) {setnetworkConnected("Mainnet")}
       if (chainId ===3) {setnetworkConnected("Ropsten")}
       if (chainId ===4) {setnetworkConnected("Rinkeby")}
       if (chainId ===5) {setnetworkConnected("Goerli")}
       if (chainId ===137) {setnetworkConnected("Polygon")}
       if (chainId ===80001) {setnetworkConnected("Mumbai")}
       if (chainId ===31337) {setnetworkConnected("hardhat")}
      
      
      
   
      };
    
    
  
    const connectWallet = async () => {
     
      try {
       
        if (!ethereum) notifyWarning("Please install MetaMask.");
        if (!ethereum) return alert("Please install MetaMask.");
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        
  
        setCurrentAccount(accounts[0]);
        // window.location.reload();
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

    useEffect(() => {
      checkIfWalletIsConnect();
    findNetwork()
     
    }, []);

   
 
    return (
      <ConnectContext.Provider
        value={{
          
          connectWallet,
          currentAccount,
          networkConnected,
          setupElection,
          RegisterCandidate,
          AddCategory,
          startVoting,
          endVoting,
          Compile,
          publish,
          uploadVoter,
          clear,
          Voting,
          getResult,
          electionList,
          check,
          candidateName,
          pauseContract,
          candidateList,
          mint,
          updateChairman,
          voteConsensus,
          register,
          getUserProfile
        }}
      >
        {children}
      </ConnectContext.Provider>
    );
  };

  //custom hook for contract
  export const useContractContext =()=> useContext(ConnectContext);