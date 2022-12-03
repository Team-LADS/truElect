import React, { useState } from "react";
import "../output.css";
import Chart from 'react-apexcharts';
import ReactApexChart from "react-apexcharts";


const PercentageVoters = () => {
    let chartSeries = [14, 23],
    chartOptions = {
        chart: {
          type: 'donut',
        },
        labels: ["Inactive Voters", "Active Voters"],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          labels: {
            colors: ["#eeeeee"]
          }
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                name: {
                  show: true,
                },
                value: {
                  show: true
                },
                total: {

                }
              }
            }
          }
        },
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
        <div className=" flex justify-center items-center pt-3 ">
            <div className="w-full h-full">
                <h2 className="text-center text-violet-300 font-medium text-lg mb-4">Percentage of Voters</h2>
                <ReactApexChart options={options} series={series} type="donut" height={210} />
            </div>
        </div>
    )
}

export default PercentageVoters