import React, { useEffect,useState } from 'react'
import "../output.css";
import "./catList.css";
import Pack from './Pack';
import { useContractContext } from '../context/contractContext/contractContext';

const CategoryList = () => {
  const { GetListOfCategory } = useContractContext();


  const [catlist,setCatList]= useState([])
    useEffect(()=>{
      GetListOfCategory().then((res)=>{
        setCatList(res)
      })
    },[])
  return (
    <div className='categoryList w-full h-full flex flex-col justify-between py-4 px-4'>
        <h4 className='text-center text-violet-300 font-medium text-lg'>Category List</h4>
        {
            catlist.map((category ,ind)=><Pack key={ind} className="cat__list">{category}</Pack> )
        }
    </div>
  )
}



export default CategoryList