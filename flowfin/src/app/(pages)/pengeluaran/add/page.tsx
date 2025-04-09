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
    <>
      <div className="main-content px-6 py-6 h-fit">
        <div className="content bg-white p-4 rounded-md">
          <h1 className="text-[16px] font-bold text-[#212121] pb-4 border-b-2 border-gray-200">
            Tambah Data Pengeluaran
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Nama Produk */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
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

                {/* Tanggal */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
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

                {/* Kategori */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
                    Kategori Pengeluaran <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="category"
                    id="category"
                    type="text"
                    placeholder="Kategori Pengeluaran"
                    className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
                    required
                  />
                </div>

                {/* Jumlah */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
                    Jumlah Pengeluaran <span className="text-red-500">*</span>
                  </label>
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
                <label className="block text-[14px] text-[#212121] mb-3 font-medium">
                  Deskripsi Transaksi
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400"
                  placeholder="Deskripsi Transaksi"
                  name="description"
                  id="description"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/pengeluaran")}
                  className="bg-gray-300 text-gray-700 px-4 py-2 font-semibold text-[14px] rounded-full hover:bg-gray-400 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  className="btn-add bg-[#00859B] text-white px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#497d88]"
                  type="submit"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
