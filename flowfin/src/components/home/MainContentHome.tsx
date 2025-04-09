"use client";

import { useEffect, useState } from "react";
import DataTablePendapatan from "../pendapatan/DataTablePendapatan";
import PaginationPendapatan from "../pendapatan/PaginationPendapatan";
import { AddCircle, DocumentDownload, Link } from "iconsax-react";
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import { formatDate } from "@/app/utils/formatDate";
import Dashboard from "./Dashboard";
import { useAuth } from "@/hooks/useAuth"; 
import { updateData } from "@/lib/firestore"; 

export default function MainContentHome() {
  const { user } = useAuth(); 
  const {
    transactions,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext,
    hasPrev,
    isLoading,
  } = usePaginatedTransactions();

  const [filteredTransactions, setFilteredTransactions] = useState<
    IncomeTransaction[]
  >([]);

  useEffect(() => {
    if (transactions) {
      const userTransactions = transactions.filter(
        (t) => t.userId === user?.uid 
      );
      setFilteredTransactions(userTransactions);
    }
  }, [transactions, user?.uid]);

  const truncate = (desc: string, max = 25) =>
    desc.length > max ? `${desc.slice(0, max)}...` : desc;

  return (
    <>
      <Dashboard />

      <div className="px-4 md:px-6">
        <div className="bg-white px-4 py-4 rounded-lg md:py-6 md:px-6 shadow">
          <h1 className="text-lg font-bold text-[#212121] pb-2">
            Daftar Transaksi Pendapatan & Pengeluaran
          </h1>
          {/* Desktop Table */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
              <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 font-semibold text-center">No</th>
                    <th className="p-4 font-semibold">Tanggal</th>
                    <th className="p-4 font-semibold">Produk</th>
                    <th className="p-4 font-semibold">Kategori</th>
                    <th className="p-4 font-semibold">Pendapatan</th>
                    <th className="p-4 font-semibold">Pengeluaran</th>
                    <th className="p-4 font-semibold">Deskripsi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">

                  {filteredTransactions.map((data, index) => (
                    <tr
                      key={data.id}
                      className="hover:bg-gray-50 text-center"
                    >
                      <td className="p-4">
                        {(currentPage - 1) * 8 + index + 1}
                      </td>
                      <td className="p-4 text-left">
                        {formatDate(data.timestamp)}
                      </td>

                      <td className="p-4 text-left capitalize">
                        {data.productName}
                      </td>
                      <td className="p-4 text-left capitalize">
                        {data.category}
                      </td>
                      
                      <td className="p-4 text-green-600 font-medium text-left">
                        {data.transactionType === "pendapatan"
                          ? `Rp ${data.amount.toLocaleString("id-ID")}`
                          : "-"}
                      </td>
                      <td className="p-4 text-red-500 font-medium text-left">
                        {data.transactionType === "pengeluaran"
                          ? `Rp ${data.amount.toLocaleString("id-ID")}`
                          : "-"}
                      </td>

                      <td className="p-4 text-left text-gray-600 capitalize">

                        {truncate(data.description || "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile View */}
          <div className="md:hidden space-y-4 mt-4">

            {filteredTransactions.map((data, index) => (

              <div
                key={data.id}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">
                    No: {(currentPage - 1) * 8 + index + 1}
                  </span>

                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded capitalize">
                    {data.category}
                  </span>
                </div>

                <div className="mb-1">

                  <h3 className="font-medium text-gray-900 capitalize">
                    {data.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(data.timestamp)}
                  </p>
                </div>

                <div className="text-sm mt-2">
                  <p className="text-green-600">
                    <span className="font-medium">Pendapatan: </span>
                    {data.transactionType === "pendapatan"
                      ? `Rp ${data.amount.toLocaleString("id-ID")}`
                      : "-"}

                  </p>
                  <p className="text-red-500">
                    <span className="font-medium">Pengeluaran: </span>
                    {data.transactionType === "pengeluaran"
                      ? `Rp ${data.amount.toLocaleString("id-ID")}`
                      : "-"}
                  </p>
                  {data.description && (
                    <p className="mt-1 text-gray-700 capitalize">

                      <span className="font-medium">Deskripsi: </span>
                      {truncate(data.description)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="justify-center flex">
            <PaginationPendapatan
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>
        </div>
      </div>
    </>
  );
}
