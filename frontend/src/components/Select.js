import React , { useEffect, useState } from "react";
import "../output.css";
import classnames from "./classnames"; 

import { useContractContext } from '../context/contractContext/contractContext';

const Select = ({props}) => {
    const { GetListOfCategory } = useContractContext();

const [cat,setCat] = useState([])


useEffect(()=>{
    GetListOfCategory().then((res)=>{setCat(res)})
},[GetListOfCategory])

    let {name,category, defaultOption, handleChange} = props
    // let {name,category, array, defaultOption, handleChange, ref} = props
    let classes = classnames([`w-full`, `py-[10px]`, `px-[16px]`, `border`, `border-gray-400 rounded`, "focus:outline-none"])
    return (
        <select 
        value={category} name={name} onChange={(e)=>{handleChange(e.target.value)}} defaultValue={""}
            className={classes}
        >
            <option value={""} className={``} disabled>{ defaultOption }</option>
            {cat?.map((item,idx) => <option key={item + "-" + idx} value={item}>{item}</option>)}
        </select>
    )
}

export default Select