import React, { useRef } from "react";
import "../output.css";

import { useContractContext } from '../context/contractContext/contractContext';
import { useState } from "react"
const CategoryBox = () => {
    const { AddCategory,candidateList ,GetListOfCategory} = useContractContext();


    const [category, setCategory] = useState("")
    let inputRef = useRef()

    const handleAdd = async () => {
       
     const res =    await AddCategory(category)

    }

    const handleDelete = () => {
        inputRef.current.value = ""
    }

    return (
        <div className="w-full h-full flex flex-col justify-between py-4 px-4">
            <h2 className="text-center text-violet-300 font-medium text-lg mb-4">Category</h2>
            <input value={category}  onChange={(e)=>{ setCategory(e.target.value) }} name="category" className="w-full mb-10 border border-gray-400 py-[10px] px-3 rounded focus:outline-none" />
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

export default CategoryBox