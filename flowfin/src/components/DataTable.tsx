import { Edit2, Trash } from "iconsax-react";

export default function DataTable() {
    return (
        <>
            <table className="table-auto mt-4 w-full text-left">
                <thead>
                    <tr>
                        <th className='bg-gray-100 p-3 font-semibold rounded-tl-lg text-[14px] text-center'>No</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center'>Tanggal</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center'>Kategori Pengeluaran</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center'>Jumlah Pengeluaran</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center'>Deskripsi Transaksi</th>
                        <th className='bg-gray-100 p-3 font-semibold rounded-tr-lg text-center'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='index-info px-3 text-[14px] font-normal'>1</td>
                        <td className='tanggal px-3 text-[14px] font-normal'>26/03/2025</td>
                        <td className='kategori-penjualan px-3 text-[14px] font-normal'>Penjualan Video Tutorial</td>
                        <td className='jumlah px-3 text-[14px] font-normal'>Rp. 350.000</td>
                        <td className='deskripsi px-3 text-[14px] font-normal'>Penjualan video tutorial membuat aplikasi manajemen kas berbasis web</td>
                        <td className='aksi'>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-gray-100 hover:text-white'>
                                <Edit2 size="20" color="#797B8C" variant="Bold" />
                            </button>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-red-100 hover:text-white'>
                                <Trash size="20" color="#F74B4B" variant="Bold" />
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='index-info px-3 text-[14px] font-normal'>1</td>
                        <td className='tanggal px-3 text-[14px] font-normal'>26/03/2025</td>
                        <td className='kategori-penjualan px-3 text-[14px] font-normal'>Penjualan Video Tutorial</td>
                        <td className='jumlah px-3 text-[14px] font-normal'>Rp. 350.000</td>
                        <td className='deskripsi px-3 text-[14px] font-normal'>Penjualan video tutorial membuat aplikasi manajemen kas berbasis web</td>
                        <td className='aksi'>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-gray-100 hover:text-white'>
                                <Edit2 size="20" color="#797B8C" variant="Bold" />
                            </button>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-red-100 hover:text-white'>
                                <Trash size="20" color="#F74B4B" variant="Bold" />
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='index-info px-3 text-[14px] font-normal'>1</td>
                        <td className='tanggal px-3 text-[14px] font-normal'>26/03/2025</td>
                        <td className='kategori-penjualan px-3 text-[14px] font-normal'>Penjualan Video Tutorial</td>
                        <td className='jumlah px-3 text-[14px] font-normal'>Rp. 350.000</td>
                        <td className='deskripsi px-3 text-[14px] font-normal'>Penjualan video tutorial membuat aplikasi manajemen kas berbasis web</td>
                        <td className='aksi'>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-gray-100 hover:text-white'>
                                <Edit2 size="20" color="#797B8C" variant="Bold" />
                            </button>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-red-100 hover:text-white'>
                                <Trash size="20" color="#F74B4B" variant="Bold" />
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='index-info px-3 text-[14px] font-normal'>1</td>
                        <td className='tanggal px-3 text-[14px] font-normal'>26/03/2025</td>
                        <td className='kategori-penjualan px-3 text-[14px] font-normal'>Penjualan Video Tutorial</td>
                        <td className='jumlah px-3 text-[14px] font-normal'>Rp. 350.000</td>
                        <td className='deskripsi px-3 text-[14px] font-normal'>Penjualan video tutorial membuat aplikasi manajemen kas berbasis web</td>
                        <td className='aksi'>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-gray-100 hover:text-white'>
                                <Edit2 size="20" color="#797B8C" variant="Bold" />
                            </button>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-red-100 hover:text-white'>
                                <Trash size="20" color="#F74B4B" variant="Bold" />
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='index-info px-3 text-[14px] font-normal'>1</td>
                        <td className='tanggal px-3 text-[14px] font-normal'>26/03/2025</td>
                        <td className='kategori-penjualan px-3 text-[14px] font-normal'>Penjualan Video Tutorial</td>
                        <td className='jumlah px-3 text-[14px] font-normal'>Rp. 350.000</td>
                        <td className='deskripsi px-3 text-[14px] font-normal'>Penjualan video tutorial membuat aplikasi manajemen kas berbasis web</td>
                        <td className='aksi'>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-gray-100 hover:text-white'>
                                <Edit2 size="20" color="#797B8C" variant="Bold" />
                            </button>
                            <button className='p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-red-100 hover:text-white'>
                                <Trash size="20" color="#F74B4B" variant="Bold" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
