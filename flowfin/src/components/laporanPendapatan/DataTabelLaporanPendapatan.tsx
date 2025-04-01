import { Edit2, Trash } from "iconsax-react";

export default function DataTabelLaporanPendapatan() {
    const data = [
        {
            id: 1,
            date: "01/03/2025",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 350.000",
            description:
                "Penjualan video tutorial membuat aplikasi manajemen kas berbasis web",
        },
        {
            id: 2,
            date: "15/01/2025",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 370.000",
            description:
                "Penjualan video tutorial membuat aplikasi pencatatan keuangan pribadi dengan react js",
        },
        {
            id: 3,
            date: "09/11/2025",
            category: "Penjualan Source Code",
            amount: "Rp. 700.000",
            description: "Penjualan source code aplikasi manajemen berbasis web",
        },
        {
            id: 4,
            date: "18/12/2024",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 550.000",
            description:
                "Penjualan video tutorial membuat aplikasi manajemen kas berbasis web",
        },
        {
            id: 5,
            date: "06/12/2024",
            category: "Penjualan Source Code",
            amount: "Rp. 400.000",
            description: "Penjualan source code aplikasi persediaan barang",
        },
        {
            id: 6,
            date: "01/12/2024",
            category: "Jasa Web Development",
            amount: "Rp. 3.250.000",
            description: "Pembuatan aplikasi antrian pengunjung",
        },
        {
            id: 7,
            date: "22/11/2024",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 1.000.000",
            description:
                "Penjualan video tutorial membuat aplikasi pencatatan keuangan pribadi dengan next js",
        },
        {
            id: 8,
            date: "20/11/2024",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 750.000",
            description:
                "Penjualan video tutorial membuat aplikasi manajemen kas berbasis web",
        },
        {
            id: 9,
            date: "13/10/2024",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 550.000",
            description:
                "Penjualan video tutorial membuat aplikasi manajemen kas berbasis web",
        },
        {
            id: 10,
            date: "13/09/2024",
            category: "Penjualan Video Tutorial",
            amount: "Rp. 370.000",
            description:
                "Penjualan video tutorial membuat aplikasi manajemen kas berbasis web",
        },
    ];
    return (
        <>
            <table className="table-auto mt-4 w-full text-left">
                <thead>
                    <tr>
                        <th className='bg-gray-100 p-3 font-semibold rounded-tl-lg text-[14px] text-center'>No</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center text-[14px]'>Tanggal</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center text-[14px]'>Kategori Pendapatan</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center text-[14px]'>Jumlah Pendapatan</th>
                        <th className='bg-gray-100 p-3 font-semibold text-center text-[14px]'>Deskripsi Transaksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((data, index) => (
                        <tr key={data.id} className='border-b-2 border-gray-200'>
                            <td className='index-info px-3 py-7 text-[14px] font-normal '>{index + 1}</td>
                            <td className='tanggal px-3 text-[14px] font-normal'>{data.date}</td>
                            <td className='kategori-penjualan px-3 text-[14px] font-normal'>{data.category}</td>
                            <td className='jumlah px-3 text-[14px] font-normal'>{data.amount}</td>
                            <td className='deskripsi px-3 text-[14px] font-normal'>{data.description}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
