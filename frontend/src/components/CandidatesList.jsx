import './catList.css'
import Pack from './Pack';
const CandidatesList = () => {
    const catList = Array(4).fill('candidates')
    return (
      <div className='categoryList w-full h-full flex flex-col justify-between py-4 px-4'>
          <h4 className='text-center text-violet-300 font-medium text-lg'>Candidates List</h4>
          {
              catList.map(cad=>(
                  <Pack className="cat__list">{cad}</Pack>
              ))
          }
      </div>
    )
}

export default CandidatesList