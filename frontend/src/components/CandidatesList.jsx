import './catList.css'
import './cadlist.css'
import Pack from './Pack';
import Card from './Card';
import { useEffect, useState } from 'react';
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import { useContractContext } from '../context/contractContext/contractContext';
import { ethers } from "ethers";

const CandidatesList = () => {
    const [showCandidate, setShowCandidate] = useState(false);
    const [candidate, setCandidate] = useState([]);
    const [category, setCategory] = useState([]);
 
    const { candidateList,GetListOfCategory } = useContractContext();
    useEffect(()=>{
        candidateList().then((res)=>{
            setCandidate(res)})

        GetListOfCategory().then((res)=>{
            setCategory(res)})
             },[])
    return (
      <div className='categoryList__container w-full h-full flex flex-col justify-between py-4 px-4'>
          <h4 className='text-center text-violet-300 font-medium text-lg'>Candidates List</h4>
          {
              candidate.map((cad,ind)=>(
                  <Pack key={ind} className="cat__list"> 
                    <Card className='cad' onClick={()=>setShowCandidate(prev=>!prev)}>
                        <div>
                            <h5 className='cad__question'>{category[cad[2]-1]}</h5>
                            <button className="cad__icon" >
                                {showCandidate? <AiOutlineMinus/>: <AiOutlinePlus/>
                                }
                            </button>
                        </div>
                        {
                            showCandidate &&  <p className={`${showCandidate?"cad__answer":"cad__hide"}`}>
                                {cad[1]}
                                {/* {cad} */}
                                
                        </p>
                        }
                        {
                            !showCandidate &&  <p className={`${showCandidate?"cad__answer":"cad__hide"}`}>
                          {/* {cad} */}
                          {cad[1]}

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