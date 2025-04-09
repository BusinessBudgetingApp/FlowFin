"use client";

import { AddCircle, DocumentDownload } from "iconsax-react";
import { IncomeTransaction } from "@/types/transaction";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import Link from "next/link";
import DataTablePengeluaran from "./DataTablePengeluaran";
import PaginationPengeluaran from "./PaginationPengeluaran";
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { exportPDF } from "@/app/utils/exportPDF";

export default function MainContentPengeluaran() {
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
  } = usePaginatedTransactions("pengeluaran", 8);

  const [isExporting, setIsExporting] = useState(false);
  const bodyData = useRealTimeUpdate("pengeluaran");

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
        "Tipe Transaksi": item.transactionType || "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      worksheet["!cols"] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 30 },
        { wch: 20 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pengeluaran");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const transactionType = filteredData[0]?.transactionType || "Pengeluaran";
      a.href = url;
      a.download = `Data_${transactionType}_${
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
      <div className="main-content px-6 py-6 h-fit">
        <div className="content bg-white p-4 rounded-md">
          <h1 className="text-[16px] font-bold text-[#212121] pb-4">
            Daftar Transaksi Pengeluaran
          </h1>
          <div className="flex w-full pb-2 gap-5 items-center justify-between">
            <form action="" className="w-full">
              <input
                className="search h-[40px] text-[14px] text-gray-600 w-full bg-[#F2F2F2] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#00859B] focus:ring-offset-0.5 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                name="text"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                value={searchQuery}
              />
            </form>
            <div className="flex gap-5 w-full items-center">
              <div className="flex items-center gap-3">
                <h2 className="font-medium text-[#797B8C] text-[16px]">
                  Urutkan:
                </h2>
                <div className="border border-gray-300 px-1.5 rounded-full font-semibold text-[14px] cursor-pointer">
                  <select
                    name="urutkan"
                    id="urutkan"
                    className="py-3 pr-2 mx-1.5 outline-none"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="">-- Pilih --</option>
                    <option value="harga-tertinggi">Harga Tertinggi</option>
                    <option value="harga-terendah">Harga Terendah</option>
                  </select>
                </div>
              </div>
              <div className="pl-5 border-l-1 border-[#B7BBC0]">
                <div className="flex gap-3">
                  <button
                    className="btn-add group border border-[#00859B] text-[#00859B] px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#00859B] hover:text-white"
                    onClick={() => exportPDF(bodyData, "Pengeluaran")}
                  >
                    <DocumentDownload
                      size="18"
                      variant="Bold"
                      className="group-hover:fill-white fill-[#00859B]"
                    />
                    Cetak
                  </button>
                  <Link href="/pengeluaran/add" passHref>
                    <button className="btn-add bg-[#00859B] text-white px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center hover:bg-[#006F7D] transition-colors duration-200 cursor-pointer">
                      <AddCircle size="18" color="#ffff" variant="Bold" />
                      Tambah Data
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DataTablePengeluaran data={filteredData} currentPage={currentPage} />

        <PaginationPengeluaran
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
