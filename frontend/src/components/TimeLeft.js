import React, { useState } from "react";
import "../output.css";
import Chart from 'react-apexcharts';


const TimeLeft = () => {
    let chartSeries = [90],
    chartOptions = {
        chart: {
          type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
              hollow: {
                size: '55%',
              },
              dataLabels: {
                value: {
                  color: "#eeeeee",
                  formatter: function(val) {
                    return Math.floor(val / 4) + "Hrs"
                  }
                }
              },
            },
        },
        
        labels: ['Time Left', "HH:MM"],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

    let [series, setSeries] = useState(chartSeries);
    let [options, setOptions] = useState(chartOptions);

    return (
        <div className=" flex justify-center items-center ">
            <Chart options={options} series={series} type="radialBar" height={320} />
        </div>
    )
}

export default TimeLeft