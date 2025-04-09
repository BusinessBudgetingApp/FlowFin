import React from "react";
import { Pie } from "react-chartjs-2";

import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import { Timestamp } from "firebase/firestore";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
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

const COLORS = [
  "#40C4FF",
  "#FFCA28",
  "#4CAF50",
  "#E0E0E0",
  "#0288D1",
  "#34C759",
  "#F06292",
  "#BA68C8",
  "#FFD54F",
  "#81C784",
];

export default function Chart({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const income: IncomeTransaction[] = useRealTimeUpdate("pendapatan");
  const outcome: IncomeTransaction[] = useRealTimeUpdate("pengeluaran");

  const filterByMonth = (transactions: IncomeTransaction[]) =>
    transactions.filter((i) => {
      const date = (i.timestamp as Timestamp).toDate();
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });

  const incomeByMonth = filterByMonth(income);
  const outcomeByMonth = filterByMonth(outcome);

  const incomeData = {
    labels: incomeByMonth.map((i) => i.productName),
    datasets: [
      {
        data: incomeByMonth.map((i) => i.amount),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const outcomeData = {
    labels: outcomeByMonth.map((i) => i.productName),
    datasets: [
      {
        data: outcomeByMonth.map((i) => i.amount),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const renderLegend = (labels: string[]) => (
    <div className="max-h-[160px] overflow-y-auto pr-2">
      <ul className="text-sm space-y-1">
        {labels.map((label, index) => (
          <li key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 inline-block rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 items-start">
      {/* Income Section */}
      <div className="w-full">
        <h3 className="font-semibold text-sm md:text-base text-center mb-2">
          Pendapatan Terbesar
        </h3>
        <div className="flex gap-4">
          <div className="relative w-[180px] h-[180px]">
            <Pie data={incomeData} options={options} />
          </div>
          {renderLegend(incomeData.labels)}
        </div>
      </div>

      {/* Outcome Section */}
      <div className="w-full">
        <h3 className="font-semibold text-sm md:text-base text-center mb-2">
          Pengeluaran Terbesar
        </h3>
        <div className="flex gap-4">
          <div className="relative w-[180px] h-[180px]">
            <Pie data={outcomeData} options={options} />
          </div>
          {renderLegend(outcomeData.labels)}
        </div>
      </div>
    </div>
  );
}
