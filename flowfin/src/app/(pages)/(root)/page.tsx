"use client";

import { formatDate } from "@/app/utils/formatDate";
import Dashboard from "@/components/home/Dashboard";
import PaginationPendapatan from "@/components/pendapatan/PaginationPendapatan";
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions";
import { withAuth } from "@/lib/withAuth";

function Home() {
  const {
    transactions,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext,
    hasPrev,
  } = usePaginatedTransactions();

  const truncate = (desc: string, max = 25) =>
    desc.length > max ? `${desc.slice(0, max)}...` : desc;

  return (
    <>
      <div className="mb-2">
        <Dashboard />
      </div>

      <div className="bg-white mx-6 py-4 rounded-lg md:px-6">
        <h1 className="text-lg font-bold text-[#212121] pb-2">
          Daftar Transaksi Pendapatan & Pengeluaran
        </h1>
        {/* Desktop Table */}
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
              {transactions?.map((data, index) => (
                <tr key={data.id} className="hover:bg-gray-50 text-center">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 text-left">{formatDate(data.timestamp)}</td>
                  <td className="p-4 text-left">{data.productName}</td>
                  <td className="p-4 text-left">{data.category}</td>
                  <td className="p-4 text-green-600 font-medium text-left">
                    {data.transactionType === "pendapatan"
                      ? `Rp. ${data.amount.toLocaleString("id-ID")}`
                      : "-"}
                  </td>
                  <td className="p-4 text-red-500 font-medium text-left">
                    {data.transactionType === "pengeluaran"
                      ? `Rp. ${data.amount.toLocaleString("id-ID")}`
                      : "-"}
                  </td>
                  <td className="p-4 text-left text-gray-600">
                    {truncate(data.description || "")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 mt-4">
          {transactions?.map((data, index) => (
            <div
              key={data.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  No: {index + 1}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {data.category}
                </span>
              </div>

              <div className="mb-1">
                <h3 className="font-medium text-gray-900">
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
                    ? `Rp. ${data.amount.toLocaleString("id-ID")}`
                    : "-"}
                </p>
                <p className="text-red-500">
                  <span className="font-medium">Pengeluaran: </span>
                  {data.transactionType === "pengeluaran"
                    ? `Rp. ${data.amount.toLocaleString("id-ID")}`
                    : "-"}
                </p>
                {data.description && (
                  <p className="mt-1 text-gray-700">
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
    </>
  );
}

export default withAuth(Home);
