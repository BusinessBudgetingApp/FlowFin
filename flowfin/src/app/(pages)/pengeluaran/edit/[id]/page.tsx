"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IncomeTransaction } from "@/types/transaction";
import { Timestamp } from "firebase/firestore";
import { updateData } from "@/lib/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from "@/lib/withAuth";

function EditPengeluaran() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<Partial<IncomeTransaction>>({
    productName: "",
    amount: 0,
    category: "",
    description: "",
    timestamp: Timestamp.now(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "transaction", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as IncomeTransaction;
          setFormData({
            productName: data.productName,
            amount: data.amount,
            category: data.category,
            description: data.description,
            timestamp: data.timestamp,
          });
        } else {
          toast.error("Dokumen tidak ditemukan");
          router.push("/pengeluaran");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        toast.error("Gagal memuat data");
      }
    };

    fetchData();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setFormData((prev) => ({
      ...prev,
      timestamp: Timestamp.fromDate(date),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const toastId = toast.loading("Menyimpan perubahan...", {
        position: "top-right",
      });

      await updateData(id, formData);

      toast.update(toastId, {
        render: "Perubahan pengeluaran berhasil disimpan!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/pengeluaran");
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Gagal menyimpan perubahan pengeluaran", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formatDateForInput = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="main-content px-6 py-6 h-fit">
        <div className="content bg-white p-4 rounded-md">
          <h1 className="text-[16px] font-bold text-[#212121] pb-4 border-b-2 border-gray-200">
            Edit Data Pengeluaran
          </h1>
          <div className="pt-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Nama Produk/Layanan */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
                    Nama Produk/Layanan <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="Nama Produk/Layanan"
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
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
                    value={
                      formData.timestamp
                        ? formatDateForInput(formData.timestamp)
                        : ""
                    }
                    onChange={handleDateChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
                    required
                  />
                </div>

                {/* Kategori Pengeluaran */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
                    Kategori Pengeluaran <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    type="text"
                    placeholder="Kategori Pengeluaran"
                    className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
                    required
                  />
                </div>

                {/* Jumlah Pengeluaran */}
                <div>
                  <label className="block text-[14px] text-[#212121] mb-3 font-medium">
                    Jumlah Pengeluaran <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
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
                  value={formData.description}
                  onChange={handleChange}
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
                  className="bg-[#00859B] text-white px-4 py-2.5 rounded-full font-semibold text-[14px] flex gap-2 items-center cursor-pointer hover:bg-[#497d88]"
                  type="submit"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(EditPengeluaran);
