import React, { useState } from "react";
import "../output.css";
import Chart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import TimeLeft from "./TimeLeft";



const MainBox = () => {
    let chartSeries = [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    colors = ["#98FB98"],
    chartOptions = {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts'], 
          ],
          labels: {
            style: {
              colors: "#eeeeee",
              fontSize: '12px'
            }
          }
        }
    }

    // let [series, setSeries] = useState(chartSeries);
    // let [options, setOptions] = useState(chartOptions);

    let [series] = useState(chartSeries);
    let [options] = useState(chartOptions);

    return (
        <div className="w-full h-full flex items-center">
            <div className="w-2/3 h-full py-4">
              <h2 className="text-center text-violet-300 font-medium text-lg mb-4">
                Change Election Comittee Head
              </h2>
              <Chart options={options} series={series} type="bar" height={330} />
            </div>
            <div className="w-1/3 h-full grid grid-rows-2 gap-4 grid-flow-row relative pt-4 pb-4">
              <div className="absolute flex justify-center items-center top-4">
                <span className=" rounded-b-full h-1/2 ">
                  <Icon icon="noto:trophy" width="50" />
                </span>
              </div>
              <div className="w-full h-1/2">
                <TimeLeft />
              </div>
              <div className="w-full flex items-end justify-center gap-4">
                <button className="py-2 px-4 rounded text-white bg-[#5C0CC7] hover:bg-violet-600 active:scale-95">
                    Start
                </button>
                <button className="py-2 px-4 rounded text-white bg-[#F24B88] hover:bg-pink-600 active:scale-9">
                    Stop
                </button>
                <button className="py-2 px-4 rounded text-white bg-[#49A3F2] hover:bg-sky-500 active:scale-9">
                    Compile
                </button>
              </div>
            </div>
        </div>
    )
}

export default MainBox