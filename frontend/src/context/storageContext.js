import { createContext ,useContext,useState} from "react";
import axios from "axios";
import { Web3Storage} from 'web3.storage'
import { toast } from "react-toastify";



const STORAGE_TOKEN = process.env.REACT_APP_WEB3_STORAGE_TOKEN;

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


export const StorageContext = createContext();


const createJsonFile= (userData)=> {
    const blob = new Blob([JSON.stringify(userData)], { type: 'application/json' })
  
    const files = [
      new File([blob], userData.walletAddress)
    ]
    return files
  }

export const StorageProvider = ({ children }) => {
    const [userProfile,setUserProfile] = useState();
    const [isVerified,setIsVerified] = useState();

    // get user profile and update user profile state
    const getUserProfileStorage = async(currentAccount)=>{
            try {
                notifyInfo("Fetching user profile...")
                //get user from db

                console.log({backend:process.env.REACT_APP_SERVER_PROFILE})
                const res = await axios.post(process.env.REACT_APP_SERVER_PROFILE,{walletAddress:currentAccount});
                const result = res.data;
                console.log("result",result.payload.cidLink)
                //get user profile web3storage and update user profile state
                const user = await axios.get(result.payload.cidLink);
                console.log({user})
                
                if(user) notifySuccess("User profile updated successfully")
                setUserProfile(user.data);
                setIsVerified(res.data.isVerified)
                return{ ...result, status: res.status}
            } catch (error) {
                console.log( error.response)
                console.log(error?.response?.data)
                notifyError(error.response.data.message)
                return error.response
            }
    }
 
    const uploadUserProfile =async(info)=>{
            try {
                //check if the user is already registered
                const isAlreadyRegistered = await getUserProfileStorage(info.walletAddress); 
                console.log(isAlreadyRegistered)
                console.log(isAlreadyRegistered?.status)

                if(isAlreadyRegistered.status === 200) return notifyError(`${info.walletAddress} is already registered}`);
                if(isAlreadyRegistered.status === 500) return notifyError("Server error");
                if(isAlreadyRegistered.status === 404){
                    const file = createJsonFile(info)
               
                    if (!STORAGE_TOKEN ) {
                        return console.error('A token is needed. You can create one on https://web3.storage')
                    }
                    const web3storage = async ()=>{

                        const storage = new Web3Storage({ token:STORAGE_TOKEN })
            
                        const files = [file]

                        console.log(`Uploading ${files.length} files`)
                        notifyInfo(`Uploading ${files.length} files`)
                        console.log(`Uploading ${files.length} files`)

                        const cid = await storage.put(file,{
                            name:info.walletAddress,
                            maxRetries:3
                        })
                        const cidLink = `https://${cid}.ipfs.w3s.link/${info.walletAddress}`
                        console.log('Content added with CID:', cid)
                        notifySuccess('Content added with CID: '+ cid)
                        console.log(cidLink)
                        //create a user in the backend 
                        const res = await axios.post(process.env.REACT_APP_SERVER_REGISTER,{walletAddress:info.walletAddress,cid:cid,cidLink:cidLink});
                        if(res.statusCode === 200) notifySuccess(res.data.message);

                        return cid
                    }
                    
                 return await    web3storage()
                } 
                
            } catch (error) {
                console.log("err",error)
                return console.error(error)
            }
 
    };
   

    return <StorageContext.Provider value={
        {
            userProfile,
            isVerified,
            getUserProfileStorage,
            uploadUserProfile,
            notifyError,
            notifyInfo,
            notifySuccess,
            notifyWarning
        }
    }>{children}</StorageContext.Provider>
}




//custom hook for using storage context
export const useStorageContext = ()=> useContext(StorageContext);

