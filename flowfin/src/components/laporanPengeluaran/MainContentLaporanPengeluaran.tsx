import Link from "next/link";
import { DocumentDownload } from "iconsax-react";
import iconLaporanPengeluaran from '../../../public/iconLaporanPengeluaran.png'
import DataTabelLaporanPengeluaran from "./DataTabelLaporanPengeluaran";
import PaginationLaporanPengeluaran from "./PaginationLaporanPengeluaran";

export default function MainContentLaporanPengeluaran() {
    return (
        <>
            <div className="main-content px-6 py-6 h-fit">
                <div className="content bg-white p-4 rounded-md">
                    <form className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium">Nama Produk <span className="text-red-500">*</span></label>
                                <input
                                    placeholder="Nama Produk"
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                                    required />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium">Tanggal <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="timestamp"
                                    id="timestamp"
                                    className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                                    required />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium">Kategori Pengeluaran <span className="text-red-500">*</span></label>
                                <input
                                    name="category"
                                    id="category"
                                    type="text"
                                    placeholder="Kategori Pendapatan"
                                    className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
                                    required />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium">Jumlah Pengeluaran <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    placeholder="Jumlah Pendapatan"
                                    className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
                                    required
                                    min="0" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Deskripsi Transaksi</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400"
                                placeholder="Deskripsi Transaksi"
                                maxLength={100}
                                name="description"
                                id="description" />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button className='btn-add bg-[#00859B] text-white px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#497d88]'>Simpan Data</button>

                        </div>
                    </form>
                </div>
            </div>

            <div className="main-content px-6 pb-6 h-fit">
                <div className="content bg-white p-4 rounded-md">
                    <div className="flex w-full pb-2 gap-5 items-center justify-between">
                        <div className="gap-1">
                            <h1 className='text-[18px] font-bold text-[#212121]'>Daftar Laporan Pengeluaran</h1>
                            <p className="text-[14px] text-[#797B8C]">Laporan pengeluaran penjualan video tutorial <span className="text-[14px] text-[#212121] font-medium">06/12/2024</span> s.d. <span className="text-[14px] text-[#212121] font-medium">01/03/2025</span></p>
                        </div>
                        <div className="flex items-center">
                            <picture>
                                <img src={iconLaporanPengeluaran.src} width={60} height={60} alt="" />
                            </picture>
                            <div className="gap-1 px-4">
                                <h1 className='text-[18px] font-bold text-[#212121]'>Rp. 2.370.000</h1>
                                <p className="text-[14px] text-[#797B8C]">Total Pengeluaran</p>
                            </div>

                            <div className="pl-5 border-l-1 border-[#B7BBC0]">
                                <Link href="/addPendapatan">
                                    <button className='btn-add group border border-[#00859B] text-[#00859B] px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#00859B] hover:text-white'><DocumentDownload size="20" variant="Bold" className="group-hover:fill-white fill-[#00859B]" />Cetak</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <DataTabelLaporanPengeluaran />
                    <PaginationLaporanPengeluaran />
                </div>
            </div>
        </>
    )
}
