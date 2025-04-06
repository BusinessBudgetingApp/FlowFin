"use client";
import { useState } from "react";
import Chart from "./Chart";
import AnimatedDropdown, { DropdownItem } from "../AnimatedDropdown";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import { Timestamp } from "firebase/firestore";
import { useGetAllData } from "@/hooks/useGetAllData";
import { TotalRincian } from "../TotalRincian";

const now = new Date();

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  const item = useGetAllData();
  const income: IncomeTransaction[] = useRealTimeUpdate("pendapatan");
  const outcome: IncomeTransaction[] = useRealTimeUpdate("pengeluaran");

  const incomeByYearMonth = income.filter((i) => {
    if (!i.timestamp) return false;
    const transactionDate = (i.timestamp as Timestamp).toDate();
    return (
      transactionDate.getFullYear() === selectedYear &&
      transactionDate.getMonth() + 1 === selectedMonth
    );
  });

  const totalIncome = incomeByYearMonth.reduce(
    (sum, i) => sum + (i.amount || 0),
    0
  );

  const outcomeByYearMonth = outcome.filter((i) => {
    if (!i.timestamp) return false;
    const transactionDate = (i.timestamp as Timestamp).toDate();
    return (
      transactionDate.getFullYear() === selectedYear &&
      transactionDate.getMonth() + 1 === selectedMonth
    );
  });

  const totalOutcome = outcomeByYearMonth.reduce(
    (sum, i) => sum + (i.amount || 0),
    0
  );

  const uniqueYears = Array.from(
    new Set(
      item.map(
        (data) => data.timestamp && data.timestamp.toDate().getFullYear()
      )
    )
  ).sort((a, b) => b - a);

  const months = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Feb" },
    { id: 3, name: "Mar" },
    { id: 4, name: "Apr" },
    { id: 5, name: "Mei" },
    { id: 6, name: "Jun" },
    { id: 7, name: "Jul" },
    { id: 8, name: "Ags" },
    { id: 9, name: "Sep" },
    { id: 10, name: "Okt" },
    { id: 11, name: "Nov" },
    { id: 12, name: "Des" },
  ];

  return (
    <div className="main-content px-4 py-4 md:px-6 md:py-6 h-[100vh] overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
        {/* Total Rincian Pendapatan */}
        <TotalRincian pendapatan={totalIncome} pengeluaran={totalOutcome} />

        {/* Chart Section */}
        <div className="content bg-white rounded-md col-span-1 sm:col-span-2 md:col-span-8">
          <div className="flex flex-col md:flex-row justify-between p-4 border-b">
            <div className="flex flex-col gap-2 mb-4 md:mb-0">
              <h2 className="text-base md:text-lg font-bold">Pendapatan VS Pengeluaran</h2>
              <h4 className="text-xs md:text-sm font-medium text-gray-500">
                Berdasarkan kategori transaksi
              </h4>
            </div>

            {/* Dropdown Pilihan Tahun dan Bulan */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <div className="w-full sm:w-auto">
                <p className="text-center text-sm">Pilih Tahun</p>
                <AnimatedDropdown
                  label="Pilih Tahun"
                  selected={selectedYear.toString()}
                  onSelect={(value) => setSelectedYear(Number(value))}
                  className="w-full"
                >
                  {uniqueYears.map((year) => (
                    <DropdownItem
                      key={year}
                      value={year.toString()}
                      onSelect={() => setSelectedYear(year)}
                    >
                      {year}
                    </DropdownItem>
                  ))}
                </AnimatedDropdown>
              </div>

              <div className="w-full sm:w-auto">
                <p className="text-center text-sm">Pilih Bulan</p>
                <AnimatedDropdown
                  label="Pilih Bulan"
                  selected={selectedMonth.toString()}
                  onSelect={(value) => setSelectedMonth(Number(value))}
                  className="w-full"
                >
                  {months.map(({ id, name }) => (
                    <DropdownItem
                      key={id}
                      value={id.toString()}
                      onSelect={() => setSelectedMonth(id)}
                    >
                      {name}
                    </DropdownItem>
                  ))}
                </AnimatedDropdown>
              </div>
            </div>
          </div>
          <Chart month={selectedMonth} year={selectedYear} />
        </div>
      </div>
    </div>
  );
}