import React from 'react'
import { CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler, Chart } from "chart.js";
import ChartStreaming from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import { Line } from 'react-chartjs-2';
import solarService from '../services/solar';


Chart.register(ChartStreaming, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Filler)

const RealtimeGraph = ({ title, token, max }) => {

    const data = {
        datasets: [
          {
            label: {title},
            backgroundColor: 'rgba(178, 222, 39, 0.2)',
            pointRadius: 0,
            fill: true,
            borderColor: 'rgba(178, 222, 39, 1)',
            borderWidth: 1,
            tension: 0.5
          }
        ]
    }

    const options = {
        scales: {
          y:
            {
              grid: {
                color: 'rgb(47, 47, 47)'
              },
              suggestedMin: 0,
              suggestedMax: {max}
            },
          x: {
            type: 'realtime',
            realtime: {
              delay: 3000,
              onRefresh: chart => {
                solarService.getSolarData(token)
                .then((data) => {
                  if (data.authenticated) {
                    let lastSolarDatapoint = data.solarData[data.solarData.length - 1];
                    let lastChartDatapoint = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] || 0;
                    if (lastSolarDatapoint._id === lastChartDatapoint.id ) {
                    } else {
                      chart.data.datasets.forEach(dataset => {
                        dataset.data.push({
                          id: lastSolarDatapoint._id,
                          x: Date.now(),
                          y: lastSolarDatapoint.voltage
                        })
                      })
                    }
    
                    chart.update('quiet');
                  }
          })
              }
            },
            grid: {
              color: 'rgb(47, 47, 47)'
            }
          }
        }
    };

  return (
    <div className="card bg-dark p-3">
        <p className='text-center'>{title}</p>
        <Line data={data} options={options} />
    </div>
  )
}

export default RealtimeGraph