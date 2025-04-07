"use client";

import { AddCircle, DocumentDownload } from "iconsax-react";
import { IncomeTransaction } from "@/types/transaction";
import Link from "next/link";
import DataTablePengeluaran from "./DataTablePengeluaran";
import PaginationPengeluaran from "./PaginationPengeluaran";
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions";
import { useEffect, useState } from "react";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { exportPDF } from "@/app/utils/exportPDF";
import { Metadata } from "next";

export default function MainContentPengeluaran() {
  const [dataTransaction, setDataTransaction] = useState<IncomeTransaction[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<IncomeTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    transactions,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext,
    hasPrev,
  } = usePaginatedTransactions("pengeluaran", 8);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setFilteredData(transactions);
      return;
    }
    const filterData = transactions.filter((item) =>
      item.category.toLowerCase().includes(query)
    );
    setFilteredData(filterData);
  };

  // data cetak
  const bodyData = useRealTimeUpdate("pengeluaran");

  useEffect(() => {
    if (transactions) {
      setDataTransaction(transactions);
      setFilteredData(transactions);
    }
  }, [transactions]);

  return (
    <div className="main-content px-4 sm:px-6 py-6 h-fit w-full">
      <div className="content bg-white p-4 rounded-md">
        <h1 className="text-[16px] font-bold text-[#212121] pb-4">
          Daftar Transaksi Pengeluaran
        </h1>

        {/* Search + Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full pb-4">
          {/* Search Input */}
          <form className="w-full lg:w-1/2">
            <input
              className="h-[40px] text-[14px] text-gray-600 w-full bg-[#F2F2F2] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#00859B] transition-all duration-150"
              name="text"
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={searchQuery}
            />
          </form>

          {/* Filter + Buttons */}
          <div className="flex flex-col sm:flex-row lg:items-center gap-4 w-full lg:w-1/2 justify-between flex-wrap">
            <div className="flex items-center gap-3">
              <label
                htmlFor="urutkan"
                className="font-medium text-[#797B8C] text-[14px] sm:text-[16px]"
              >
                Urutkan:
              </label>
              <div className="border border-gray-300 px-1.5 rounded-full font-semibold text-[14px] cursor-pointer">
                <select
                  name="urutkan"
                  id="urutkan"
                  className="py-2 pr-2 mx-1.5 outline-none bg-transparent"
                  defaultValue=""
                >
                  <option value="harga-tertinggi">Harga Tertinggi</option>
                  <option value="harga-terendah">Harga Terendah</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button className="group border border-[#00859B] text-[#00859B] px-4 py-2 rounded-full font-semibold text-[14px] flex justify-center items-center gap-2 hover:bg-[#00859B] hover:text-white transition-colors duration-200 w-full sm:w-auto">
                <DocumentDownload
                  size="18"
                  variant="Bold"
                  className="group-hover:fill-white fill-[#00859B]"
                />
                Cetak
              </button>
              <Link href="/pengeluaran/add" passHref>
                <button className="bg-[#00859B] text-white px-4 py-2 cursor-pointer rounded-full font-semibold text-[14px] flex justify-center items-center gap-2 hover:bg-[#006F7D] transition-colors duration-200 w-full sm:w-auto">
                  <AddCircle size="18" color="#ffff" variant="Bold" />
                  Tambah Data
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <DataTablePengeluaran data={filteredData} />

        {/* Pagination */}
        <PaginationPengeluaran
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
}
