import React, { useState } from "react";
import "../output.css";


const ElectionCommitteeBox = () => {
    let [isElectionActive, setIsElectionActive] = useState(true)

    const handlePause = () => {
        setIsElectionActive((status)=>!status)
    }
 
    return (
        <div className="w-full h-full flex flex-col justify-between py-4 px-2">
            <h2 className="text-center text-violet-300 font-medium text-lg mb-4">
                Change Election Comittee Head
            </h2>
            <div className="flex justify-center mb-10">
                <button className="py-2 px-4 text-white bg-[#5C0CC7] hover:bg-violet-600 active:scale-95">
                    Yes
                </button>
                <button className="py-2 px-4 text-white bg-[#F24B88] hover:bg-pink-600 active:scale-95">
                    No
                </button>
            </div>
            <div className="flex justify-center gap-8">
                <button   onClick={handlePause}
                    className="py-2 px-4 rounded text-white bg-[#F24B88] hover:bg-pink-600 active:scale-95 
                    disabled:opacity-40 disabled:hover:bg-[#F24B88] disabled:active:scale-100"
                    style={{
                        backgroundColor:isElectionActive?"#F24B88":"#5C0CC7"
                    }}
                >
                    {isElectionActive?'Pause':"unpause"}
                </button>
            </div>

        </div>
    )
}

export default ElectionCommitteeBox