/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { ReactElement, useEffect, useState } from 'react';
// import { CategoryScale, Chart, ChartConfiguration, registerables } from "chart.js";
import axios from 'axios';
import {
  Chart as ChartJS,
  // ChartConfiguration,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

/* declare const window: Window &
  typeof globalThis & {
    myLine: object;
  }; */

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip
  // Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: new Date().getFullYear().toString(),
      backgroundColor: '#4c51bf',
      borderColor: '#4c51bf',
      data: [65, 78, 66, 44, 56, 67, 75],
      fill: false,
    },
    {
      label: (new Date().getFullYear() - 1).toString(),
      fill: false,
      backgroundColor: '#fff',
      borderColor: '#fff',
      data: [40, 68, 86, 74, 56, 60, 87],
    },
  ],
};

const lineOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    // legend: {
    // 	position: 'top' as const,
    // },
    title: {
      display: true,
      text: 'Line Chart: Error Counter',
    },
  },
  title: {
    display: true,
    text: 'Line Chart: Error Counter',
    fontColor: 'white',
  },
  legend: {
    labels: {
      fontColor: 'white',
    },
    align: 'end',
    position: 'bottom',
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
};

const lineLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Desember',
];

const lineDataDefault = {
  labels: lineLabels,
  datasets: [
    {
      label: 'Dataset Performance',
      data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    // 	label: 'Dataset Error',
    // 	data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
    // 	borderColor: 'rgb(53, 162, 235)',
    // 	backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

export default function CardLineChart() {
  const [activeNav, setActiveNav] = React.useState(1);
  const [lineData, setLineData] = useState(lineDataDefault);
  const [totalNotify, setTotalNotify] = useState(0);

  React.useEffect(() => {
    void (async () => {
      const ROOT_API = process.env.NEXT_PUBLIC_API || 'http://10.14.20.49:4010';
      const url = `${ROOT_API}/apierrmon/lineday`;
      const result = await axios(url);
      // console.log('result', result);
      // console.log('data', result.data.data);
      const monitoring = result?.data?.data[0]?.monitoring ?? [];
      // console.log('monitoring', monitoring);
      // console.log('totalNotify', result.data.count);
      setTotalNotify(parseInt(result?.data?.count));

      const labels = [] as any;
      const data = [] as any;

      monitoring.map((items: []) => {
        items.map((item: any) => {
          for (const [key, value] of Object.entries(item)) {
            // console.log('key', key, 'value', value);
            if (key === 'date') {
              labels.push(value);
            } else {
              data.push(value);
            }
          }
        });
      });
      setLineData({
        labels: labels,
        datasets: [
          {
            label: 'Dataset Error',
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    })();

    const config = {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: new Date().getFullYear().toString(),
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: (new Date().getFullYear() - 1).toString(),
            fill: false,
            backgroundColor: '#fff',
            borderColor: '#fff',
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              id: 'x',
              ticks: {
                color: (context: { tick: { major: string } }) =>
                  context.tick && context.tick.major && '#FF0000',
              },
              reverse: false,
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white',
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              id: 'y',
              ticks: {
                color: (context: { tick: { major: string } }) =>
                  context.tick && context.tick.major && '#FF0000',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white',
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    // const canvas = document.getElementById("line-chart") as HTMLCanvasElement;
    // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // window.myLine = new Chart(ctx, config);
    // const chart: Chart = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t bg-transparent px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow">
              <h6 className="text-blueGray-400 mb-1 text-xs font-semibold uppercase">
                Overview
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Error Chart
              </h2>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4">
          {/* Chart */}
          <div className="h-350-px relative">
            {/* <canvas id="line-chart"></canvas> */}
            {/* <Line options={options} data={data} /> */}
            <Line options={lineOptions} data={lineData} />
          </div>
        </div>
      </div>
    </>
  );
}
