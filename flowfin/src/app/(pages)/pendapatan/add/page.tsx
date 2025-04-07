"use client";

import { addData } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddData() {
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

      if (!productName || !amount || !category || !timestamp) {
        toast.error("Harap isi semua field yang wajib diisi");
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

      const toastId = toast.loading("Menyimpan data...");

      await addData(data);

      toast.update(toastId, {
        render: "Data berhasil disimpan!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      setTimeout(() => {
        router.push("/pendapatan");
      }, 1000);

    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan data");
    }
  }

  return (
    <div className="main-content px-4 sm:px-6 py-6 h-fit">
      <div className="content bg-white p-4 rounded-md">
        <h1 className="text-[16px] font-bold text-[#212121] pb-4 border-b-2 border-gray-200">
          Tambah Data Pendapatan
        </h1>
        <div className="pt-4">
          <form
            className="space-y-4"
            action={createPost}
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              createPost(new FormData(e.currentTarget));
            }}
          >
            {/* Responsive Form Grid */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              <div className="flex-1 min-w-[240px]">
                <label className="block text-[14px] text-[#212121] mb-2 font-medium">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Nama Produk"
                  type="text"
                  name="productName"
                  id="productName"
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                  required
                />
              </div>
              <div className="flex-1 min-w-[240px]">
                <label className="block text-[14px] text-[#212121] mb-2 font-medium">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="timestamp"
                  id="timestamp"
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                  required
                />
              </div>
              <div className="flex-1 min-w-[240px]">
                <label className="block text-[14px] text-[#212121] mb-2 font-medium">
                  Kategori Pendapatan <span className="text-red-500">*</span>
                </label>
                <input
                  name="category"
                  id="category"
                  type="text"
                  placeholder="Kategori Pendapatan"
                  className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex-1 min-w-[240px]">
                <label className="block text-[14px] text-[#212121] mb-2 font-medium">
                  Jumlah Pendapatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Jumlah Pendapatan"
                  className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-[14px] text-[#212121] mb-2 font-medium">
                Deskripsi Transaksi
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400"
                placeholder="Deskripsi Transaksi"
                name="description"
                id="description"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => router.push("/pendapatan")}
                className="bg-gray-300 text-gray-700 px-4 py-2 font-semibold text-[14px] rounded-full hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                className="bg-[#00859B] text-white px-4 py-2 font-semibold text-[14px] rounded-full hover:bg-[#497d88] transition-colors cursor-pointer"
                type="submit"
              >
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
