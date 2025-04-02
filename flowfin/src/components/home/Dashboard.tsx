"use client";
import { useState } from "react";
import TotalRincian from "../TotalRincian";
import Chart from "./Chart";
import AnimatedDropdown, { DropdownItem } from "../AnimatedDropdown";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import { Timestamp } from "firebase/firestore";
import { useGetAllData } from "@/hooks/useGetAllData";

const now = new Date();

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  const item = useGetAllData();
  console.log(item, "<< Data Semua Transaksi");

  // Ambil data pendapatan & pengeluaran secara real-time
  const income: IncomeTransaction[] = useRealTimeUpdate("pendapatan");
  const outcome: IncomeTransaction[] = useRealTimeUpdate("pengeluaran");

  // **Filter pendapatan berdasarkan tahun dan bulan yang dipilih**
  const incomeByYearMonth = income.filter((i) => {
    if (!i.timestamp) return false;
    const transactionDate = (i.timestamp as Timestamp).toDate();
    return (
      transactionDate.getFullYear() === selectedYear &&
      transactionDate.getMonth() + 1 === selectedMonth
    );
  });

  // **Hitung total pendapatan**
  const totalIncome = incomeByYearMonth.reduce(
    (sum, i) => sum + (i.amount || 0),
    0
  );

  // **Filter pengeluaran berdasarkan tahun dan bulan yang dipilih**
  const outcomeByYearMonth = outcome.filter((i) => {
    if (!i.timestamp) return false;
    const transactionDate = (i.timestamp as Timestamp).toDate();
    return (
      transactionDate.getFullYear() === selectedYear &&
      transactionDate.getMonth() + 1 === selectedMonth
    );
  });

  // **Hitung total pengeluaran**
  const totalOutcome = outcomeByYearMonth.reduce(
    (sum, i) => sum + (i.amount || 0),
    0
  );

  // **Buat daftar tahun unik**
  const uniqueYears = Array.from(
    new Set(
      item.map(
        (data) => data.timestamp && data.timestamp.toDate().getFullYear()
      )
    )
  ).sort((a, b) => b - a); // Urutkan tahun dari terbaru ke lama

  // **Daftar bulan dengan angka (1-12) dan nama**
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
    <div className="main-content px-6 py-6 h-[100vh] overflow-auto">
      <div className="grid grid-cols-12 gap-5">
        {/* Total Rincian Pendapatan */}
        <TotalRincian pendapatan={totalIncome} pengeluaran={totalOutcome} />

        {/* Chart Section */}
        <div className="content bg-white rounded-md col-span-9">
          <div className="flex justify-between p-4 border-b">
            <div className="flex flex-col gap-2 mb-0">
              <h2 className="text-lg font-bold">Pendapatan VS Pengeluaran</h2>
              <h4 className="text-sm font-medium text-gray-500">
                Berdasarkan kategori transaksi
              </h4>
            </div>

            {/* Dropdown Pilihan Tahun */}
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

            {/* Dropdown Pilihan Bulan */}
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
          <Chart month={selectedMonth} year={selectedYear} />
        </div>
      </div>
    </div>
  );
}
