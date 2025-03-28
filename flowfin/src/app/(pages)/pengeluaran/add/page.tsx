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
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Tambah Data</h1>
      <div className="mt-8">
        <form action={createPost} method="POST">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 gap-6">
              <label className="text-gray-700" htmlFor="amount">
                Jumlah
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <label className="text-gray-700" htmlFor="productName">
                Nama Produk
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <label className="text-gray-700" htmlFor="category">
                Kategori
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <label className="text-gray-700" htmlFor="category">
                Description
              </label>
              <input
                type="area"
                name="description"
                id="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <label className="text-gray-700" htmlFor="timestamp">
                Tanggal
              </label>
              <input
                type="date"
                name="timestamp"
                id="timestamp"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
