import React, { useState } from "react";
import "../output.css";
import Chart from 'react-apexcharts';
import elections from "../DATA";


const ActiveElections = () => {
    let chartSeries = [14, 23, 21, 17, 15],
    chartOptions = {
        chart: {
            type: 'polarArea',
        },
        labels: elections["Election 10"],
        stroke: {
            colors: ['#aaa']
        },
        fill: {
            opacity: 0.8
        },
        legend: {
            show: true,
            labels: {
                colors: ["#eeeeee"]
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                position: 'bottom'
                }
            }
        }]
    };

    let [series, setSeries] = useState(chartSeries);
    let [options, setOptions] = useState(chartOptions);

    return (
        <div className=" flex justify-center items-center pt-3">
            <div className="w-full h-full">
                <h2 className="text-center text-violet-300 font-medium text-lg mb-4">Votes Per Candidate</h2>
                <Chart options={options} series={series} type="polarArea" height={220} />
            </div>
        </div>
    )
}

export default ActiveElections