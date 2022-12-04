import React, { useState } from "react";
import "../output.css";
// import ReactApexChart from "react-apexcharts";


const ElectionsListSingle = ({props}) => {
    let {idx, item} = props

    let chartSeries = [21, 22, 10, 28, 16, 21, 13, 30, 22, 10, 28, 16, 21, 22, 10, 28, 16, 21, 13, 30, 22, 10, 28]

    // let [series, setSeries] = useState(chartSeries);         
    let [series] = useState(chartSeries);         

    return (
        <div className="h-[70px]  rounded-l-full rounded-r-full bg-violet-600 flex my-[2px] py-1" key={"div" + idx} 
        
        
        style={{
            marginTop:"20px",
            marginLeft:'3%',
            width:'95%'
        }}
        >
            <div className="w-1/2 py-3 pl-5 pr-0 h-full" key={"div-left" + idx}
              
        style={{
        width:'55%'
        }}
            >
                <div className="flex items-baseline justify-evenly gap-[1px] h-full" key={"bars" + idx}>
                    {
                        series.map((el,ind,arr) => {
                            let h = Math.floor((el / Math.max(...arr)) * 100), 
                            style = {height: `${h}%`}
                            return <div className="w-[2px] bg-sky-400" style={style} key={"bar" + idx + ind}></div>
                        })
                    }
                </div>
            </div>
            <div className="py-2 w-1/2" key={"div-right" + idx}>
                <div className="border-l h-full border-gray-300 flex items-center justify-center" key={"container" + idx} 
         >
                    <p className="font-medium text-sm text-gray-300" key={"p" + item}>
                        {item}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ElectionsListSingle