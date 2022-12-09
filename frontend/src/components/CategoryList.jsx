import React, { useEffect,useState } from 'react'
import "../output.css";
import "./catList.css";
import Pack from './Pack';
import { useContractContext } from '../context/contractContext/contractContext';

const CategoryList = () => {
<<<<<<< HEAD
    const catList = Array(10).fill('category')
=======
  const { GetListOfCategory } = useContractContext();


  const [catlist,setCatList]= useState([])
    useEffect(()=>{
      GetListOfCategory().then((res)=>{
        console.log(res)
        setCatList(res)
      })
    },[])
>>>>>>> 422cef29e705b03514dd385d0ea24204dc68fcb0
  return (
    <div className='categoryList w-full h-full flex flex-col justify-between py-4 px-4'>
        <h4 className='text-center text-violet-300 font-medium text-lg'>Category List</h4>
        {
            catlist.map(category=>
              { 

               console.log(category)
                return  <Pack className="cat__list">{category}</Pack>
           } )
        }
    </div>
  )
}



export default CategoryList