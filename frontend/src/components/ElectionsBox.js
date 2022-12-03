import React, {useRef, useState} from "react";
import "../output.css";
import Select from "./Select";
import elections from "../DATA";


const ElectionsBox = () => {
    let [selectedElection, setSelectedElection] = useState("")

    let electionRef = useRef()
    let candidateRef = useRef()

    let handleElectionChange = (e) => {
        setSelectedElection(e.target.value)
    }

    let electionSelectProps = {
        name: "election",
        array: Object.keys(elections), 
        defaultOption: "Select an election",
        handleChange: handleElectionChange,
        ref: electionRef
    }

    let candidateSelectProps = {
        name: "candidate",
        array: elections[selectedElection] || [], 
        defaultOption: "Select a Candidate",
        handleChange: () => {},
        ref: candidateRef
    }

    return (
        <div className="w-full h-full grid place-items-center py-4 px-4">
            <h2 className="text-center text-violet-300 font-medium text-lg mb-4">Vote</h2>
            <div className="w-full mx-auto flex justify-center"><Select props = { electionSelectProps } /></div>
            <div className="w-full mx-auto flex justify-center"><Select props = { candidateSelectProps } /></div>
            <button className="py-2 px-4 rounded text-white bg-[#5C0CC7] hover:bg-violet-600 active:scale-95">
                Vote
            </button>
        </div>
    )
}

export default ElectionsBox