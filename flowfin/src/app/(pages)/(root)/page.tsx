"use client";

import { formatDate } from "@/app/utils/formatDate";
import Dashboard from "@/components/home/Dashboard";
import { useGetAllData } from "@/hooks/useGetAllData";
import { withAuth } from "@/lib/withAuth";
import { IncomeTransaction } from "@/types/transaction";
import { useEffect, useState } from "react";

function Home() {
  const item = useGetAllData();

  return (
    <>
      <div className="h-[26em]">
        <Dashboard />
      </div>
      <div className="content px-6 py-6   ">
        <table className="table-auto mt-4 w-full text-left">
          <thead>
            <tr>
              <th className="bg-gray-100 p-4 font-semibold rounded-tl-lg text-[14px] text-center">
                No
              </th>
              <th className="bg-gray-100 p-4 font-semibold text-center text-[14px]">
                Tanggal
              </th>
              <th className="bg-gray-100 p-4 font-semibold text-center text-[14px]">
                Nama Produk
              </th>
              <th className="bg-gray-100 p-4 font-semibold text-center text-[14px]">
                Kategori Pendapatan
              </th>
              <th className="bg-gray-100 p-4 font-semibold text-center text-[14px]">
                Jumlah Pendapatan
              </th>
              <th className="bg-gray-100 p-4 font-semibold text-center text-[14px]">
                Jumlah Pengeluaran
              </th>
              <th className="bg-gray-100 p-4 font-semibold text-center text-[14px]">
                Deskripsi Transaksi
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {item &&
              item.map((data, index) => (
                <tr key={data.id} className="border-b-2 border-gray-200">
                  <td className="index-info px-3 py-1 text-[14px] font-normal">
                    {index + 1}
                  </td>
                  <td className="tanggal px-3 py-1 text-[14px] font-normal">
                    {formatDate(data.timestamp)}
                  </td>
                  <td className="kategori-penjualan px-3 py-1 text-[14px] font-normal">
                    {data.productName}
                  </td>
                  <td className="kategori-penjualan px-3 py-1 text-[14px] font-normal">
                    {data.category}
                  </td>
                  <td
                    className={`jumlah px-3 text-[14px] font-normalpy-1  text-green-500`}
                  >
                    {data.transactionType === "pendapatan"
                      ? `Rp. ${data.amount}`
                      : `-`}
                    {/* Rp. {data.amount.toLocaleString("id-ID")} */}
                  </td>
                  <td
                    className={`jumlah px-3 text-[14px] font-normalpy-1  text-red-500`}
                  >
                    {data.transactionType === "pengeluaran"
                      ? `Rp. ${data.amount}`
                      : `-`}
                  </td>
                  <td className="deskripsi px-3 text-[14px] py-1 font-normal">
                    {data.description}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default withAuth(Home);
