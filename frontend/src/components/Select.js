import React from "react";
import "../output.css";
import classnames from "./classnames";


const Select = ({props}) => {
    let {name, array, defaultOption, handleChange, ref} = props
    let classes = classnames([`w-full`, `py-[10px]`, `px-[16px]`, `border`, `border-gray-400 rounded`, "focus:outline-none"])
    return (
        <select ref={ref} name={name} onChange={handleChange} defaultValue={""}
            className={classes}
        >
            <option value={""} className={``} disabled>{ defaultOption }</option>
            {array?.map((item,idx) => <option key={item + "-" + idx} value={item}>{item}</option>)}
        </select>
    )
}

export default Select