import { useState } from "react";
import { useContractContext } from "../context/contractContext/contractContext";

const Csv = () => {
   //fetchCategory,AddCategory
   const [isFileUpload, setisFileUpload] = useState(false);
   const [Addresses, setAddresses] = useState([]);
   // contract context
   const {upload,mint} = useContractContext();
   // function to convert csv file from input file to arr, it receives a str paramater
   const csvToArray = (str) => {
    // split arrays the file according to \n newline regex
    // const firstArr = str.split("\n");
    const arr = str.split("\r\n");

    console.log(arr);
    return arr;
  };

  const  handleUpload=(e, role, voteNo, arr) =>{
    e.preventDefault();
    // input file tag is is cvsFile
   
    upload(role,voteNo, arr);
    mint( arr)

    setisFileUpload(false);
  }

  const handleChange=(e) =>{
    e.preventDefault();
    // input file tag is is cvsFile

    // const csvFile = document.getElementById("csvFile");
    const input = e.target.files[0];
    // reading the file
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      // calling our csvToArray(str) to convert to array
      // data here is like our secondArray earlier
      const data = csvToArray(text);

      // setisFileUpload to true as we've uploaded our file
      setisFileUpload(true);

      // update ourAddresses array
      setAddresses(data);
    };

    reader.readAsText(input);
  }


  return (
    <div className='csv'>
        <div className="csv w-full h-full text-black text-xl font-bold flex flex-col overflow-y-auto flex-none px-2 py-2">
            <h3 className="text-center text-violet-300 font-medium text-lg mb-4">Upload Voters</h3>
            <form className="bg-[#F24B88] " >
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </form>
            
        </div>
    </div>
  )
}

export default Csv