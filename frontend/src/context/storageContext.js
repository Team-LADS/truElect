import { useEffect,createContext ,useContext,useState} from "react";
import axios from "axios";
import { Web3Storage, getFilesFromPath } from 'web3.storage'


const STORAGE_TOKEN = process.env.REACT_APP_WEB3_STORAGE_TOKEN;

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

    // get user profile and update user profile state
    const GetUserProfile = (cid)=>{
        console.log("https://dweb.link/ipfs/"+cid);

        useEffect(()=>{
            axios.get('https://dweb.link/ipfs/'+cid).then(result=>{
                console.log(result)
                return result
                // setUserProfile(result);
            }).catch(error=>console.log(error))
        },[])
    }

    const UploadUserProfile =(info)=>{
        console.log("show state")
        useEffect(()=>{
            // const info = {
            //     fullname:	"Prince",
            //     age	:10,
            //     gender:	"male",
            //     email	:"prince@example.com",
            //     address:	{
            //     street:	"Prince Street",
            //     city:	"county zero",
            //     state:	"shanzy",
            //     zip	:"12345"
            //     },
            //     vin	:"123457902984578w39488wueyuw",
            //     isregistered:	true,
            //     profileimage:	"owhfojwew-jd0aahoajfbov",
            //     walletAddress:'0x003ufl84702fykwudksllyeu'
            // }
            try {
                const file = createJsonFile(info)
               
                if (!STORAGE_TOKEN ) {
                    return console.error('A token is needed. You can create one on https://web3.storage')
                }
           
                const web3storage = async ()=>{
                    const storage = new Web3Storage({ token:STORAGE_TOKEN })
        
                    const files = [file]
                    console.log(`Uploading ${files.length} files`)
                    const cid = await storage.put(file,{
                        name:info.walletAddress,
                        maxRetries:3
                    })
                    console.log('Content added with CID:', cid)
                    console.log(`https://${cid}.ipfs.dweb.link/${info.walletAddress}`)
                }
                
                web3storage()
                
            } catch (error) {
                return console.error(error)
            }
        },[])
 
    };

    return <StorageContext.Provider value={
        {
            userProfile,
            GetUserProfile,
            UploadUserProfile
        }
    }>{children}</StorageContext.Provider>
}




//custom hook for using storage context
export const useStorageContext = ()=> useContext(StorageContext);

