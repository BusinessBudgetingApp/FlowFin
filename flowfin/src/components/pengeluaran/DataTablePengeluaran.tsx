import { formatDate } from "@/app/utils/formatDate";
import { IncomeTransaction } from "@/types/transaction";
import { Edit2, Trash } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteData } from "@/lib/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DataTablePengeluaran({
  data,
}: {
  data: IncomeTransaction[];
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
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data pengeluaran ini?"
    );
    if (!isConfirmed) return;

    try {
      // Tampilkan toast loading
      const toastId = toast.loading("Menghapus data pengeluaran...", {
        position: "top-right",
      });

      await deleteData(id);

      // Update toast menjadi sukses
      toast.update(toastId, {
        render: "Data pengeluaran berhasil dihapus!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      router.refresh();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      toast.error("Terjadi kesalahan saat menghapus data pengeluaran", {
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
            <th className="bg-gray-100 px-3 py-2  font-semibold rounded-tl-lg text-[14px] text-center">
              No
            </th>
            <th className="bg-gray-100 px-3 py-2  font-semibold text-left text-[14px]">
              Tanggal
            </th>
            <th className="bg-gray-100 px-3 py-2  font-semibold text-left text-[14px]">
              Nama Produk/Layanan
            </th>
            <th className="bg-gray-100 px-3 py-2  font-semibold text-left text-[14px]">
              Kategori Pengeluaran
            </th>
            <th className="bg-gray-100 px-3 py-2  font-semibold text-left text-[14px]">
              Jumlah Pengeluaran
            </th>
            <th className="bg-gray-100 px-3 py-2  font-semibold text-left text-[14px]">
              Deskripsi Transaksi
            </th>
            <th className="bg-gray-100 px-3 py-2  font-semibold rounded-tr-lg text-center text-[14px]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data &&
            data.map((item, index) => (
              <tr key={item.id} className="border-b-2 border-gray-200">
                <td className="index-info px-3 text-[14px] font-normal">
                  {index + 1}
                </td>
                <td className="tanggal px-3 text-[14px] font-normal text-left">
                  {formatDate(item.timestamp)}
                </td>
                <td className="kategori-penjualan px-3 text-[14px] font-normal text-left">
                  {item.productName}
                </td>
                <td className="kategori-penjualan px-3 text-[14px] font-normal text-left">
                  {item.category}
                </td>
                <td className="jumlah px-3 text-[14px] font-normal text-left">
                  Rp. {item.amount.toLocaleString('id-ID')}
                </td>
                <td className="deskripsi px-3 text-[14px] font-normal text-left">
                  {item.description}
                </td>
                <td className="aksi flex justify-center">
                  <Link href={`/pengeluaran/edit/${item.id}`}>
                    <button className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-gray-100">
                      <Edit2 size="18" color="#797B8C" variant="Bold" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-red-100">
                    <Trash size="18" color="#F74B4B" variant="Bold" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
