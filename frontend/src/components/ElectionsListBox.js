import React from "react";
import "../output.css";
import elections from "../DATA";
import ElectionsListSingle from "./ElectionsListSingle";


const ElectionsListBox = () => {
    
    let electionsList = Object.keys(elections).map((item,idx) => {
        return ( <ElectionsListSingle props={{idx, item}} key={"single" + idx} /> )
    })
    return (
        <div className="main-content w-full h-full text-black text-xl font-bold flex flex-col overflow-y-auto flex-none px-2 py-4">
            <h2 className="text-center text-violet-300 font-medium text-lg mb-4">List of Elections</h2>
            <div>
                {electionsList}
            </div>
            
        </div>
    )
}

export default ElectionsListBox