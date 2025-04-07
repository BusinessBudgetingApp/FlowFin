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
    if (!id) {
      console.error("ID tidak tersedia");
      toast.error("ID transaksi tidak valid", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data pengeluaran ini?"
    );
    if (!isConfirmed) return;

    try {
      const toastId = toast.loading("Menghapus data pengeluaran...", {
        position: "top-right",
      });

      await deleteData(id);

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
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table table-auto mt-4 w-full text-left">
        <thead>
          <tr>
            <th className="bg-gray-100 px-3 py-2 font-semibold rounded-tl-lg text-[14px] text-center">
              No
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Tanggal
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Nama Produk/Layanan
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Kategori Pengeluaran
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Jumlah Pengeluaran
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Deskripsi Transaksi
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold rounded-tr-lg text-center text-[14px]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data &&
            data.map((item, index) => (
              <tr key={item.id} className="border-b-2 border-gray-200">
                <td className="px-3 text-[14px] font-normal">{index + 1}</td>
                <td className="px-3 text-[14px] font-normal text-left">
                  {formatDate(item.timestamp)}
                </td>
                <td className="px-3 text-[14px] font-normal text-left">
                  {item.productName}
                </td>
                <td className="px-3 text-[14px] font-normal text-left">
                  {item.category}
                </td>
                <td className="px-3 text-[14px] font-normal text-left">
                  Rp. {item.amount.toLocaleString("id-ID")}
                </td>
                <td className="px-3 text-[14px] font-normal text-left">
                  {item.description}
                </td>
                <td className="flex justify-center">
                  <Link href={`/pengeluaran/edit/${item.id}`}>
                    <button className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-gray-100">
                      <Edit2 size="18" color="#797B8C" variant="Bold" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-red-100"
                  >
                    <Trash size="18" color="#F74B4B" variant="Bold" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Mobile & Tablet Card View */}
      <div className="md:hidden space-y-3 mt-4">
        {data &&
          data.map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              {/* Header dengan No & Kategori */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  No: {index + 1}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>

              {/* Info Produk */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-500">{formatDate(item.timestamp)}</p>
                </div>
              </div>

              {/* Detail */}
              <div className="mt-2 text-sm">
                <p>
                  <span className="font-medium">Jumlah: </span>
                  Rp. {item.amount.toLocaleString("id-ID")}
                </p>
                {item.description && (
                  <p className="mt-1">
                    <span className="font-medium">Deskripsi: </span>
                    {item.description}
                  </p>
                )}
              </div>

              {/* Aksi */}
              <div className="flex justify-end space-x-2 mt-3">
                <Link href={`/pengeluaran/edit/${item.id}`}>
                  <button className="p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <Edit2 size="18" color="#797B8C" variant="Bold" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-md cursor-pointer hover:bg-red-100"
                >
                  <Trash size="18" color="#F74B4B" variant="Bold" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
