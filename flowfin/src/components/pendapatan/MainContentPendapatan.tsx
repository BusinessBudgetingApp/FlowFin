"use client";
import { AddCircle } from "iconsax-react";
import DataTable from "./DataTablePendapatan";
import Pagination from "./PaginationPendapatan";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";

export default function MainContentPendapatan() {
  const transaction: IncomeTransaction[] = useRealTimeUpdate("pendapatan");
  return (
    <>
      <div className="main-content px-6 py-6 h-fit w-full">
        <div className="content bg-white p-4 rounded-md">
          <h1 className="text-[18px] font-bold text-[#212121] pb-4">
            Daftar Transaksi Pendapatan
          </h1>
          <div className="flex w-full pb-2 gap-5 items-center justify-between ">
            <form action="" className="w-full">
              <input
                className="search h-[40px] text-[14px] text-gray-600 w-full max-w-full bg-[#F2F2F2] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#00859B] focus:ring-offset-0.5 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
                name="text"
                type="text"
                placeholder="Search..."
              />
            </form>
            <div className="flex gap-15 w-full">
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
              <div className="pl-5 border-l-1 border-[#B7BBC0]">
                <button className="btn-add bg-[#00859B] text-white px-4  py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center">
                  <AddCircle size="20" color="#ffff" variant="Bold" />
                  Tambah Data
                </button>
              </div>
            </div>
          </div>
          <DataTable item={transaction} />
          <Pagination />
        </div>
      </div>
    </>
  );
}
