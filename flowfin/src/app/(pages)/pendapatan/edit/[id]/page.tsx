// app/pendapatan/edit/[id]/page.tsx
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

export default function EditPendapatan() {
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
          router.push("/pendapatan");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        toast.error("Gagal memuat data");
      }
    };

    fetchData();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setFormData(prev => ({
      ...prev,
      timestamp: Timestamp.fromDate(date),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const toastId = toast.loading("Menyimpan perubahan...", {
        position: "top-right"
      });

      await updateData(id, formData);
      
      toast.update(toastId, {
        render: "Perubahan berhasil disimpan!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/pendapatan");
      });

    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Gagal menyimpan perubahan", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formatDateForInput = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl text-black font-semibold mb-4 flex items-center gap-2 border-b pb-2 border-gray-300">
        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
        Edit Data Pendapatan
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Nama Produk</label>
            <input
              placeholder="Nama Produk"
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Tanggal</label>
            <input
              type="date"
              name="timestamp"
              value={formData.timestamp ? formatDateForInput(formData.timestamp) : ""}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Kategori Pendapatan</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              type="text"
              placeholder="Kategori Pendapatan"
              className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Jumlah Pendapatan</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Jumlah Pendapatan"
              className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
              required
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
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/pendapatan")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            type="submit"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}