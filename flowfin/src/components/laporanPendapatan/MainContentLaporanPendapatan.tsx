import Link from "next/link";
import DataTabelLaporanPendapatan from "./DataTabelLaporanPendapatan";
import PaginationLaporanPendapatan from "./PaginationLaporanPendapatan";
import { AddCircle, DocumentDownload } from "iconsax-react";
import iconLaporanPendapatan from '../../../public/iconLaporanPendapatan.png'

export default function MainContentLaporanPendapatan() {
    return (
        <>
            <div className="main-content px-6 py-6 h-fit">
                <div className="content bg-white p-4 rounded-md">
                    <div className="flex w-full pb-2 gap-5 items-center justify-between">
                        <div className="gap-1">
                            <h1 className='text-[18px] font-bold text-[#212121]'>Daftar Laporan Pendapatan</h1>
                            <p className="text-[14px] text-[#797B8C]">Laporan pendapatan penjualan video tutorial 06/12/2024 s.d. 01/03/2025</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content px-6 pb-6 h-fit">
                <div className="content bg-white p-4 rounded-md">
                    <div className="flex w-full pb-2 gap-5 items-center justify-between">
                        <div className="gap-1">
                            <h1 className='text-[18px] font-bold text-[#212121]'>Daftar Laporan Pendapatan</h1>
                            <p className="text-[14px] text-[#797B8C]">Laporan pendapatan penjualan video tutorial 06/12/2024 s.d. 01/03/2025</p>
                        </div>
                        <div className="flex items-center">
                            <picture>
                                <img src={iconLaporanPendapatan.src} width={60} height={60} alt="" />
                            </picture>
                            <div className="gap-1 px-4">
                                <h1 className='text-[18px] font-bold text-[#212121]'>Rp. 2.370.000</h1>
                                <p className="text-[14px] text-[#797B8C]">Total Pendapatan</p>
                            </div>

                            <div className="pl-5 border-l-1 border-[#B7BBC0]">
                                <Link href="/addPendapatan">
                                    <button className='btn-add border border-[#00859B] text-[#00859B] px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#00859B]'><DocumentDownload size="20" color="#00859B" variant="Bold" />Cetak</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <DataTabelLaporanPendapatan />
                    <PaginationLaporanPendapatan />
                </div>
            </div>
        </>
    )
}
