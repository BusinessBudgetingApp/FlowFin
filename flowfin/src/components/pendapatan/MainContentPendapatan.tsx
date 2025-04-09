"use client";

import { AddCircle, DocumentDownload } from "iconsax-react";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import Link from "next/link";
import DataTablePendapatan from "./DataTablePendapatan";
import PaginationPendapatan from "./PaginationPendapatan";
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { exportPDF } from "@/app/utils/exportPDF";

export default function MainContentPendapatan() {
  const [dataTransaction, setDataTransaction] = useState<IncomeTransaction[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<IncomeTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const {
    transactions,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext,
    hasPrev,
    isLoading,
  } = usePaginatedTransactions("pendapatan", 10);
  const [isExporting, setIsExporting] = useState(false);

  const bodyData = useRealTimeUpdate("pendapatan");

  const sortProducts = (data: IncomeTransaction[], order: string) => {
    if (order === "harga-tertinggi") {
      return [...data].sort((a, b) => b.amount - a.amount);
    } else if (order === "harga-terendah") {
      return [...data].sort((a, b) => a.amount - b.amount);
    }
    return data;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = !query
      ? transactions
      : transactions.filter((item) =>
          item.productName.toLowerCase().includes(query)
        );

    const sorted = sortProducts(filtered, sortOrder);
    setFilteredData(sorted);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
    setFilteredData(sortProducts(filteredData, order));
  };

  const exportToExcel = () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      if (!filteredData || filteredData.length === 0) {
        toast.warning("Tidak ada data untuk diekspor");
        return;
      }

      const formattedData = filteredData.map((item) => ({
        Tanggal: item.timestamp.toDate().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        "Nama Produk": item.productName,
        Kategori: item.category,
        Jumlah: item.amount,
        Deskripsi: item.description || "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      worksheet["!cols"] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 30 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pendapatan");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Data_Pendapatan_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Data berhasil diunduh");
    } catch (error) {
      console.error("Gagal mengekspor data:", error);
      toast.error("Gagal mengekspor data");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (transactions) {
      const sorted = sortProducts(transactions, sortOrder);
      setDataTransaction(sorted);
      setFilteredData(sorted);
    }
  }, [transactions, sortOrder]);

  return (
    <>
      <div className="main-content px-6 py-6 h-fit w-full">
        <div className="content shadow bg-white px-2 sm:px-4 py-3 sm:py-4 rounded-t-md rounded-b-md md:rounded-b-none">
          <h1 className="text-[14px] sm:text-[16px] font-bold text-[#212121] pb-3 sm:pb-4">
            Daftar Transaksi Pendapatan
          </h1>
          <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-5 items-start sm:items-center justify-between">
            {/* Form Pencarian */}
            <form action="" className="w-full">
              <input
                className="search h-[36px] sm:h-[40px] text-[12px] sm:text-[14px] text-gray-600 w-full bg-[#F2F2F2] px-2 sm:px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#00859B] focus:ring-offset-0.5 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                name="text"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                value={searchQuery}
              />
            </form>

            {/* Bagian Sorting dan Tombol */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full items-start sm:items-center">
              {/* Sorting */}
              <div className="flex items-center gap-2 sm:gap-3">
                <h2 className="font-medium text-[#797B8C] text-[14px] sm:text-[16px]">
                  Urutkan:
                </h2>
                <div className="border border-gray-300 px-1 sm:px-1.5 rounded-full font-semibold text-[12px] sm:text-[14px] cursor-pointer">
                  <select
                    name="urutkan"
                    id="urutkan"
                    className="py-2 sm:py-3 pr-1 sm:pr-2 mx-1 sm:mx-1.5 outline-none bg-transparent"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="">-- Pilih --</option>
                    <option value="harga-tertinggi">Harga Tertinggi</option>
                    <option value="harga-terendah">Harga Terendah</option>
                  </select>
                </div>
              </div>

              {/* Tombol Cetak dan Tambah Data */}
              <div className="pl-0 sm:pl-5 border-l-0 sm:border-l border-[#B7BBC0] flex gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  className="btn-add group border border-[#00859B] text-[#00859B] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold text-[12px] sm:text-[14px] flex gap-1 sm:gap-2 items-center cursor-pointer hover:bg-[#00859B] hover:text-white transition-colors duration-200"
                  onClick={() => exportPDF(bodyData, "Pendapatan")}
                >
                  <DocumentDownload
                    size="16" // Mobile
                    className="group-hover:fill-white fill-[#00859B]" // MD screen
                    variant="Bold"
                  />
                  Cetak
                </button>
                <Link href="/pendapatan/add" passHref>
                  <button className="btn-add bg-[#00859B] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold text-[12px] sm:text-[14px] flex gap-1 sm:gap-2 items-center hover:bg-[#006F7D] transition-colors duration-200 cursor-pointer">
                    <AddCircle
                      size="16" // Mobile
                      color="#ffff"
                      variant="Bold"
                    />
                    Tambah Data
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
           <div className="flex justify-center p-5 gap-3">
           <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
           <p className="text-lg text-black dark:text-white">Loading...</p>
         </div>
        ) : (
          <DataTablePendapatan item={filteredData} currentPage={currentPage} />
        )}

        <PaginationPendapatan
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </>
  );
}
