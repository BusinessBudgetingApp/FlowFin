"use client"
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const incomeData = {
  labels: ['Bensin', 'Makan', 'Listrik', 'Game', 'Internet', 'Konser'],
  datasets: [
    {
      data: [30, 20, 15, 15, 10, 10],
      backgroundColor: [
        '#34C759',
        '#40C4FF',
        '#FFCA28',
        '#4CAF50',
        '#E0E0E0',
        '#0288D1',
      ],
      borderWidth: 1,
    },
  ],
};

const expenseData = {
  labels: ['Bensin', 'Makan', 'Listrik', 'Game', 'Internet', 'Konser'],
  datasets: [
    {
      data: [30, 20, 15, 15, 10, 10],
      backgroundColor: [
        '#40C4FF',
        '#FFCA28',
        '#4CAF50',
        '#E0E0E0',
        '#0288D1',
        '#34C759',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      enabled: true,
    },
  },
  animation: {
    duration: 1500,
    easing: 'easeInOutQuart',
  },
};

export default function Chart() {
  return (
    <div className="grid grid-cols-2 px-2">
      <div className="w-[300px] h-[200px] p-2">
        <h3 className="font-semibold ">Pendapatan Terbesar</h3>
        <div className="relative h-[180px] w-[270px] mx-auto">
          <Pie data={incomeData} options={options} />
        </div>
      </div>

      <div className="w-[300px] h-[200px] p-2">
        <h3 className="font-semibold ">Pengeluaran Terbesar</h3>
        <div className="relative h-[180px] w-[270px] mx-auto">
          <Pie data={expenseData} options={options} />
        </div>
      </div>
    </div>
  );
}