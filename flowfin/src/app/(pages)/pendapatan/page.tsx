
import { Pencil, PlusCircle, Trash } from "lucide-react";

export default function Income() {
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
    <div className="px-6">
      <header className="mb-[20px]">
        <h1 className="font-bold text-[18px] ">Daftar Transaksi Pendapatan</h1>
      </header>
      <section className="flex w-full gap-6 justify-between items-center">
        <div className="w-full ">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Pencarian"
            className="w-full h-12 rounded-lg border border-[#BCBCBD] px-3"
          />
        </div>
        <div className="relative">
          <PlusCircle className="absolute text-white top-3 left-3" />
          <button className="bg-[#00859B] rounded-[50px] w-40 h-12 text-white pl-6">
            Tambah Data
          </button>
        </div>
      </section>
      <section>
        <div className="p-4 ">
          <table className="w-full ">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-y p-2">No</th>
                <th className="border-y p-2">Tanggal</th>
                <th className="border-y p-2">Kategori Pendapatan</th>
                <th className="border-y p-2">Jumlah Pendapatan</th>
                <th className="border-y p-2">Deskripsi Transaksi</th>
                <th className="border-y p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b ">
                  <td className="border-y p-2 text-center">{index + 1}</td>
                  <td className="border-y p-2">{item.date}</td>
                  <td className="border-y p-2">{item.category}</td>
                  <td className="border-y p-2">{item.amount}</td>
                  <td className="border-y p-2">{item.description}</td>
                  <td className="  flex space-x-2 justify-center">
                    <button className="p-1 text-blue-500 hover:text-blue-700">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-500 hover:text-red-700">
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )

}
