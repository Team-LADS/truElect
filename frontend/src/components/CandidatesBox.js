import React, { useRef,useState } from "react";
import "../output.css";
import elections from "../DATA";
import Select from "./Select";

import { useContractContext } from '../context/contractContext/contractContext';

const CandidatesBox = () => {
    const { RegisterCandidate } = useContractContext();

    let inputRef = useRef()
    let selectRef = useRef()
    const [candidate,setCandidate] = useState("")
    const [category,setCategory] = useState("")
    let categorySelectProps = {
        name: "election",
        array: Object.keys(elections), 
        defaultOption: "Select an election",
        handleChange: setCategory,
        ref: selectRef
    }
// console.log(category)
    const handleAdd = () => {
        console.log(candidate)
        RegisterCandidate(candidate,category)


        // console.log(selectRef.current.value, inputRef.current.value)
        // inputRef.current.value = ""
    }

    const handleDelete = () => {
        inputRef.current.value = ""
    }

    return (
        <div className="w-full h-full flex flex-col justify-between py-4 px-4">
            <h2 className="text-center text-violet-300 font-medium text-lg">Candidates</h2>
            <div className="">
                <Select props={categorySelectProps} />
            </div>
            <input value={candidate} onChange={(e)=>{setCandidate(e.target.value)}} name="candidate" 
                className="w-full border border-gray-400 py-[10px] px-3 rounded focus:outline-none" 
            />
            <div className="flex justify-center gap-8">
                <button onClick={handleAdd}
                    className="py-2 px-4 rounded text-white bg-[#5C0CC7] hover:bg-violet-600 active:scale-95 
                    disabled:opacity-40 disabled:hover:bg-[#5C0CC7] disabled:active:scale-100"
                >
                    Add
                </button>
                <button  onClick={handleDelete}
                    className="py-2 px-4 rounded text-white bg-[#F24B88] hover:bg-pink-600 active:scale-95 
                    disabled:opacity-40 disabled:hover:bg-[#F24B88] disabled:active:scale-100"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default CandidatesBox