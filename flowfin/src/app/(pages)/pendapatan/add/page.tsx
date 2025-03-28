"use client";

import { addData } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import { usePathname } from "next/navigation";

export default function AddData() {
  const pathname = usePathname();
  const baseRoute = pathname.split("/")[1];

  async function createPost(formData: FormData) {
    const productName = formData.get("productName") as string;
    const amount = Number(formData.get("amount"));
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const timestamp = new Date(formData.get("timestamp") as string);
    const transactionType = baseRoute;

    const data = {
      productName,
      amount,
      category,
      description,
      timestamp: Timestamp.fromDate(timestamp),
      transactionType,
    };
    await addData(data);
  }

  return (
    // <div>
    //   <h1 className="text-3xl font-semibold text-gray-800">Tambah Data</h1>
    //   <div className="mt-8">
    //     <form action={createPost} method="POST">
    //       <div className="grid grid-cols-1 gap-6">
    //         <div className="grid grid-cols-1 gap-6">
    //           <label className="text-gray-700" htmlFor="amount">
    //             Jumlah
    //           </label>
    //           <input
    //             type="number"
    //             name="amount"
    //             id="amount"
    //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //           />
    //         </div>
    //         <div className="grid grid-cols-1 gap-6">
    //           <label className="text-gray-700" htmlFor="productName">
    //             Nama Produk
    //           </label>
    //           <input
    //             type="text"
    //             name="productName"
    //             id="productName"
    //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //           />
    //         </div>
    //         <div className="grid grid-cols-1 gap-6">
    //           <label className="text-gray-700" htmlFor="category">
    //             Kategori
    //           </label>
    //           <input
    //             type="text"
    //             name="category"
    //             id="category"
    //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //           />
    //         </div>
    //         <div className="grid grid-cols-1 gap-6">
    //           <label className="text-gray-700" htmlFor="category">
    //             Description
    //           </label>
    //           <input
    //             type="area"
    //             name="description"
    //             id="description"
    //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //           />
    //         </div>
    //         <div className="grid grid-cols-1 gap-6">
    //           <label className="text-gray-700" htmlFor="timestamp">
    //             Tanggal
    //           </label>
    //           <input
    //             type="date"
    //             name="timestamp"
    //             id="timestamp"
    //             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //           />
    //         </div>
    //         <div className="flex justify-end">
    //           <button
    //             type="submit"
    //             className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
    //           >
    //             Simpan
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl text-black font-semibold mb-4 flex items-center gap-2 border-b pb-2 border-gray-300">
        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
        Tambah Data Pendapatan
      </h2>

      <form className="space-y-4" action={createPost} method="POST">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Nama Produk</label>
            <input
              placeholder="Nama Produk"
              type="text"
              name="productName"
              id="productName"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Tanggal</label>
            <input
              type="date"
              name="timestamp"
              id="timestamp"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Kategori Pendapatan</label>
            <input
              name="category"
              id="category"
              type="text"
              placeholder="Kategori Pendapatan"
              className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Jumlah Pendapatan</label>
            <input
              type="number"
              name="amount"
              id="amount"

              placeholder="Jumlah Pendapatan"
              className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Deskripsi Transaksi</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400"
            placeholder="Deskripsi Transaksi"
            maxLength={100}
            name="description"
            id="description"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  );
}
