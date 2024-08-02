import React from 'react'
import './activity.css'
import {Chart as ChartJS, defaults} from "chart.js/auto"
import {Line} from "react-chartjs-2"

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";

const Activity = () => {
  return (
    <div className="Activity">
      <div className="containerCard flex">
        <div className="dataCard flex">
          <Line
              data={{
                labels:Array.from({ length: 20 }, (_, i) => `${i} s`),
                datasets: [
                  {
                    label: 'Data 1',
                    data: [23, 25, 27, 22, 24, 26, 28, 29, 30, 21, 23, 25, 27, 24, 22, 26, 28, 29, 21],
                    fill: true,
                    backgroundColor: 'rgba(0, 123, 255, 0.3)',
                    borderColor: 'rgba(0, 123, 255)',
                    pointBackgroundColor: 'rgba(0, 123, 255)',
                    pointBorderColor: 'rgba(0, 123, 255)',
                  },
                ],
              }}
              options={{
                elements:{
                  line:{
                    tension: 0.3,
                    borderWidth: 2,
                  },
                  point: {
                    radius: 5,
                    borderWidth: 2,
                  },
                },
                plugins:{
                  title:{
                    text: "Temperatura",
                    padding: {
                      bottom: 10,
                    },
                    color: '#333',
                    font: {
                      size: 18,
                      weight: 'bold',
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `Valor: ${tooltipItem.raw}`,
                    },
                  }
                },
                scales: {
                  x:{
                    grid:{
                      display: false
                    },
                  },
                  y:{
                    grid:{
                      display: false
                    }
                  }
                }
              }}
            />
          </div>

        <div className="dataCard flex">
          <Line
              data={{
                labels:["A", "B", "C"],
                datasets: [
                  {
                    label: "Data 1",
                    data: [200, 300, 400],
                    backgroundColor: 'rgba(255, 0, 0, 0.3)', 
                    borderColor: 'rgba(255, 0, 0)',          
                    pointBackgroundColor: 'rgba(255, 0, 0)', 
                    pointBorderColor: 'rgba(255, 0, 0)',     
                  },
                ],
              }}
              options={{
                elements:{
                  line:{
                    tension: 0.3,
                    borderWidth: 2,
                  },
                  point: {
                    radius: 5,
                    borderWidth: 2,
                  },
                },
                plugins:{
                  title:{
                    text: "Presion",
                    padding: {
                      bottom: 10,
                    },
                    color: '#333',
                    font: {
                      size: 18,
                      weight: 'bold',
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `Valor: ${tooltipItem.raw}`,
                    },
                  }
                },
                scales: {
                  x:{
                    grid:{
                      display: false
                    },
                  },
                  y:{
                    grid:{
                      display: false
                    }
                  }
                }
              }}
            />
        </div>

        <div className="dataCard flex">
          <Line
            data={{
              labels:["A", "B", "C"],
              datasets: [
                {
                  label: "Data 1",
                  data: [200, 300, 400],
                  backgroundColor: "rgba(255, 165, 0, 0.3)",
                  borderColor:"rgba(255, 165, 0)",
                  pointBackgroundColor: 'rgba(255, 165, 0)',
                  pointBorderColor: 'rgba(255, 165, 0)',
                },
              ],
            }}
            options={{
              elements:{
                line:{
                  tension: 0.3,
                  borderWidth: 2,
                },
                point: {
                  radius: 5,
                  borderWidth: 2,
                },
              },
              plugins:{
                title:{
                  text: "Nivel",
                  padding: {
                    bottom: 10,
                  },
                  color: '#333',
                  font: {
                    size: 18,
                    weight: 'bold',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `Valor: ${tooltipItem.raw}`,
                  },
                }
              },
              scales: {
                x:{
                  grid:{
                    display: false
                  },
                },
                y:{
                  grid:{
                    display: false
                  }
                }
              }
            }}
          />
        </div>
        

      </div>
    </div>
  )
}

export default Activity