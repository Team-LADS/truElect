import './catList.css'
import './cadlist.css'
import Pack from './Pack';
import Card from './Card';
import { useState } from 'react';
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'

const CandidatesList = () => {
    const [showCandidate, setShowCandidate] = useState(false);
    const catList = Array(4).fill('candidates')
    const categoryName = Array(4).fill('categoryName')
    return (
      <div className='categoryList__container w-full h-full flex flex-col justify-between py-4 px-4'>
          <h4 className='text-center text-violet-300 font-medium text-lg'>Candidates List</h4>
          {
              catList.map((cad,ind)=>(
                  <Pack key={ind} className="cat__list"> 
                    <Card className='cad' onClick={()=>setShowCandidate(prev=>!prev)}>
                        <div>
                            <h5 className='cad__question'>{categoryName[ind]}</h5>
                            <button className="cad__icon" >
                                {showCandidate? <AiOutlineMinus/>: <AiOutlinePlus/>
                                }
                            </button>
                        </div>
                        {
                            showCandidate &&  <p className={`${showCandidate?"cad__answer":"cad__hide"}`}>
                                {cad}
                        </p>
                        }
                        {
                            !showCandidate &&  <p className={`${showCandidate?"cad__answer":"cad__hide"}`}>
                          {cad}
                        </p>
                        }
       

                    </Card>
                  </Pack>
              ))
          }
      </div>
    )
}

export default CandidatesList