// DataTablePendapatan.tsx
import { formatDate } from "@/app/utils/formatDate";
import { IncomeTransaction } from "@/types/transaction";
import { Edit2, Trash } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteData } from "@/lib/firestore";
import { toast } from "react-toastify";

export default function DataTablePendapatan({
  item,
}: {
  item: IncomeTransaction[];
}) {
  const router = useRouter();

  const handleDelete = async (id?: string) => {
    // 1. Validasi ID
    if (!id) {
      console.error("ID tidak tersedia");
      toast.error("ID transaksi tidak valid", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    // 2. Konfirmasi penghapusan
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (!isConfirmed) return;
  
    try {
      // Tampilkan toast loading
      const toastId = toast.loading("Menghapus data...", {
        position: "top-right",
      });
  
      await deleteData(id);
      
      // Update toast menjadi sukses
      toast.update(toastId, {
        render: "Data berhasil dihapus!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
  
      router.refresh();
      
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      toast.error("Terjadi kesalahan saat menghapus data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <table className="table-auto mt-4 w-full text-left">
        <thead>
          <tr>
            <th className="bg-gray-100 p-3 font-semibold rounded-tl-lg text-[14px] text-center">
              No
            </th>
            <th className="bg-gray-100 p-3 font-semibold text-center text-[14px]">
              Tanggal
            </th>
            <th className="bg-gray-100 p-3 font-semibold text-center text-[14px]">
              Nama Produk
            </th>
            <th className="bg-gray-100 p-3 font-semibold text-center text-[14px]">
              Kategori Pendapatan
            </th>
            <th className="bg-gray-100 p-3 font-semibold text-center text-[14px]">
              Jumlah Pendapatan
            </th>
            <th className="bg-gray-100 p-3 font-semibold text-center text-[14px]">
              Deskripsi Transaksi
            </th>
            <th className="bg-gray-100 p-3 font-semibold rounded-tr-lg text-center text-[14px]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {item &&
            item.map((data, index) => (
              <tr key={data.id} className="border-b-2 border-gray-200">
                <td className="index-info px-3 text-[14px] font-normal">
                  {index + 1}
                </td>
                <td className="tanggal px-3 text-[14px] font-normal">
                  {formatDate(data.timestamp)}
                </td>
                <td className="kategori-penjualan px-3 text-[14px] font-normal">
                  {data.productName}
                </td>
                <td className="kategori-penjualan px-3 text-[14px] font-normal">
                  {data.category}
                </td>
                <td className="jumlah px-3 text-[14px] font-normal">
                  {data.amount}
                </td>
                <td className="deskripsi px-3 text-[14px] font-normal">
                  {data.description}
                </td>
                <td className="aksi flex justify-center">
                  <Link href={`/pendapatan/edit/${data.id}`}>
                    <button className="p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-gray-100">
                      <Edit2 size="20" color="#797B8C" variant="Bold" />
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(data.id)}
                    className="p-3 rounded-md cursor-pointer mx-1.5 my-3 hover:bg-red-100"
                  >
                    <Trash size="20" color="#F74B4B" variant="Bold" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}