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

  const {
    transactions,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext,
    hasPrev,
    isLoading,
  } = usePaginatedTransactions("pendapatan", 8);
  const [isExporting, setIsExporting] = useState(false);

  // Data cetak
  const bodyData = useRealTimeUpdate("pendapatan");

  // fungsi search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setFilteredData(transactions);
      return;
    }
    const filterData = transactions.filter((item) =>
      item.productName.toLowerCase().includes(query)
    );
    setFilteredData(filterData);
  };
  const exportToExcel = () => {
    if (isExporting) return;

    setIsExporting(true);

    try {
      if (!filteredData || filteredData.length === 0) {
        toast.warning("Tidak ada data untuk diekspor");
        return;
      }

      // Format data untuk Excel
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

      // Buat worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      // Atur lebar kolom
      worksheet["!cols"] = [
        { wch: 12 }, // Tanggal
        { wch: 20 }, // Nama Produk
        { wch: 20 }, // Kategori
        { wch: 15 }, // Jumlah
        { wch: 30 }, // Deskripsi
      ];

      // Buat workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pendapatan");

      // Generate file Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Buat blob dan download
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

      // Bersihkan
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
      setDataTransaction(transactions);
      setFilteredData(transactions);
    }
  }, [transactions]);

  return (
    <>
      <div className="main-content px-6 py-6 h-fit w-full">
        <div className="content bg-white p-4 rounded-md">
          <h1 className="text-[16px] font-bold text-[#212121] pb-4">
            Daftar Transaksi Pendapatan
          </h1>
          <div className="flex w-full pb-2 gap-5 items-center justify-between ">
            <form action="" className="w-full">
              <input
                className="search h-[40px] text-[14px] text-gray-600 w-full max-w-full bg-[#F2F2F2] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#00859B] focus:ring-offset-0.5 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                name="text"
                onChange={handleSearch}
                type="text"
                placeholder="Search..."
                value={searchQuery}
              />
            </form>
            <div className="flex gap-5 w-full items-center">
              <div className="flex items-center gap-3">
                <h2 className="font-medium items-center text-[#797B8C] text-[16px]">
                  Urutkan:
                </h2>
                <div className="border border-gray-300 px-1.5 rounded-full font-semibold text-[14px] cursor-pointer">
                  <select
                    name="urutkan"
                    id="urutkan"
                    className="py-3 pr-2 mx-1.5 outline-none"
                    defaultValue={""}
                  >
                    <option value="harga-tertinggi">Harga Tertinggi</option>
                    <option value="harga-terendah">Harga Terendah</option>
                  </select>
                </div>
              </div>
              <div className="pl-5 border-l-1 border-[#B7BBC0] w-full">
                <div className="flex gap-3 w-full items-center">
                  <button className="btn-add group border border-[#00859B] text-[#00859B] px-4 py-5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#00859B] hover:text-white h-[40px]">
                    <DocumentDownload
                      size="18"
                      variant="Bold"
                      className="group-hover:fill-white fill-[#00859B]"
                      onClick={() => exportPDF(bodyData, "Pendapatan")}
                    />
                    Cetak
                  </button>
                  <Link href="/pendapatan/add" passHref>
                    <button className="btn-add bg-[#00859B] text-white px-4 py-5 rounded-full font-semibold text-[14px] flex gap-2 items-center hover:bg-[#006F7D] transition-colors duration-200 cursor-pointer h-[40px]">
                      <AddCircle size="18" color="#ffff" variant="Bold" />
                      Tambah Data
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel */}
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <DataTablePendapatan item={filteredData} currentPage={currentPage} />
        )}

        {/* Pagination */}
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
