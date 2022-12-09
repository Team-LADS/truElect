import React from 'react'
import "../output.css";
import "./catList.css";
import Pack from './Pack';
const CategoryList = () => {
    const catList = Array(10).fill('category')
  return (
    <div className='categoryList w-full h-full flex flex-col justify-between py-4 px-4'>
        <h4 className='text-center text-violet-300 font-medium text-lg'>Category List</h4>
        {
            catList.map(category=>(
                <Pack className="cat__list">{category}</Pack>
            ))
        }
    </div>
  )
}



export default CategoryList