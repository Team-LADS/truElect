import React, { useEffect ,useState } from "react";
import "../output.css";
import { voters } from "../DATA";

import { useContractContext } from '../context/contractContext/contractContext';

const VotersBox = () => {
    const { candidateList} = useContractContext();
const [candidate,setCandidate] = useState([])
// const [candidate,setCandidate] = useState([])
    
    let votersList = voters.map((item) => {

        return (
            <p className="font-normal text-sm my-[2px] py-1 pl-3 bg-violet-600 rounded text-gray-300" key={"p" + item[0]}
            
            style={{
                marginTop:"5%",
                width:"95%",
                marginLeft:"2.5%",
                padding:"5%",
                borderRadius:"10px",
                textAlign:"center"
            }}
            >
                {item[1]}
            </p>
        )
    })

    useEffect(()=>{

        candidateList().then((res)=>{
            setCandidate(res)
        })
    },[])
    return (
        <div className="main-content w-full h-full text-black text-xl font-bold flex flex-col overflow-y-auto py-4 px-2 flex-none">
            <h2 className="text-center text-violet-300 font-medium text-lg mb-4">List of Voters</h2>
            <div>
                {votersList}
            </div>
            <div className="flex gap-3 justify-center mt-10 text-white font-normal text-sm">
                <button className="py-2 px-4 rounded text-white bg-[#5C0CC7] hover:bg-violet-600 active:scale-95">
                    Upload
                </button>
                <button className="py-2 px-4 rounded text-white bg-[#F24B88] hover:bg-pink-600 active:scale-9">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default VotersBox