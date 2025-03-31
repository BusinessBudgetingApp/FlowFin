"use client";

import { addData } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPengeluaran() {
  const pathname = usePathname();
  const router = useRouter();
  const baseRoute = pathname.split("/")[1];

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  async function createPost(formData: FormData) {
    try {
      const productName = formData.get("productName") as string;
      const amount = Number(formData.get("amount"));
      const category = formData.get("category") as string;
      const description = formData.get("description") as string;
      const timestamp = new Date(formData.get("timestamp") as string);
      const transactionType = baseRoute;

      // Validate required fields
      if (!productName || !amount || !category || !timestamp) {
        toast.error("Harap isi semua field yang wajib diisi", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const data = {
        productName,
        amount,
        category,
        description,
        timestamp: Timestamp.fromDate(timestamp),
        transactionType,
      };

      // Show loading toast
      const toastId = toast.loading("Menyimpan data pengeluaran...", {
        position: "top-right",
      });

      await addData(data);
      
      // Update toast to success
      toast.update(toastId, {
        render: "Data pengeluaran berhasil disimpan!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Redirect after success
      setTimeout(() => {
        router.push("/pengeluaran");
      });

    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan data pengeluaran", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl text-black font-semibold mb-4 flex items-center gap-2 border-b pb-2 border-gray-300">
        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
        Tambah Data Pengeluaran
      </h2>

      <form 
        className="space-y-4" 
        action={createPost} 
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          createPost(new FormData(e.currentTarget));
        }}
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Nama Produk/Layanan <span className="text-red-500">*</span></label>
            <input
              placeholder="Nama Produk/Layanan"
              type="text"
              name="productName"
              id="productName"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Tanggal <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="timestamp"
              id="timestamp"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Kategori Pengeluaran <span className="text-red-500">*</span></label>
            <input
              name="category"
              id="category"
              type="text"
              placeholder="Kategori Pengeluaran"
              className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Jumlah Pengeluaran <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Jumlah Pengeluaran"
              className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
              required
              min="0"
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

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/pengeluaran")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            type="submit"
          >
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  );
}