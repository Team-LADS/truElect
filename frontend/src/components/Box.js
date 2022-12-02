import React from "react";
import "../output.css";


const Box = (props) => {
    return (
        <div className="bg-gradient-to-bl from-slate-900 to-purple-900 backdrop-blur-sm drop-shadow overflow-hidden w-full h-full rounded-[10px]">
            {props.children}
        </div>
    )
}

export default Box