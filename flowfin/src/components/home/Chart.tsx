import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import { Timestamp } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 20, 
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  animation: {
    duration: 1500,
    easing: "easeInOutQuart",
  },
};

export default function Chart({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const income: IncomeTransaction[] = useRealTimeUpdate("pendapatan");
  const incomeByMonth = income.filter((i) => {
    const transactionDate = (i.timestamp as Timestamp).toDate();
    return (
      transactionDate.getMonth() + 1 === month &&
      transactionDate.getFullYear() === year
    );
  });

  const outcome: IncomeTransaction[] = useRealTimeUpdate("pengeluaran");
  const outcomeByMonth = outcome.filter((i) => {
    const transactionDate = (i.timestamp as Timestamp).toDate();
    return (
      transactionDate.getMonth() + 1 === month &&
      transactionDate.getFullYear() === year
    );
  });

  const incomeThisMonth = {
    labels: incomeByMonth.map((i) => i.productName),
    datasets: [
      {
        data: incomeByMonth.map((i) => i.amount),
        backgroundColor: [
          "#34C759",
          "#40C4FF",
          "#FFCA28",
          "#4CAF50",
          "#E0E0E0",
          "#0288D1",
        ],
        borderWidth: 1,
      },
    ],
  };

  const outcomeThisMonth = {
    labels: outcomeByMonth.map((i) => i.productName),
    datasets: [
      {
        data: outcomeByMonth.map((i) => i.amount),
        backgroundColor: [
          "#40C4FF",
          "#FFCA28",
          "#4CAF50",
          "#E0E0E0",
          "#0288D1",
          "#34C759",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
      <div className="w-full max-w-[300px] mx-auto">
        <h3 className="font-semibold text-sm md:text-base text-center mb-2">
          Pendapatan Terbesar
        </h3>
        <div className="relative w-full h-[170px] sm:h-[200px]">
          <Pie data={incomeThisMonth} options={options} />
        </div>
      </div>

      <div className="w-full max-w-[300px] mx-auto">
        <h3 className="font-semibold text-sm md:text-base text-center mb-2">
          Pengeluaran Terbesar
        </h3>
        <div className="relative w-full h-[170px] sm:h-[200px]">
          <Pie data={outcomeThisMonth} options={options} />
        </div>
      </div>
    </div>
  );
}