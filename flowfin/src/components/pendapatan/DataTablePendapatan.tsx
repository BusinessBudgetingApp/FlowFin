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
    if (!id) {
      console.error("ID tidak tersedia");
      toast.error("ID transaksi tidak valid", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!isConfirmed) return;

    try {
      const toastId = toast.loading("Menghapus data...", {
        position: "top-right",
      });

      await deleteData(id);

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
              Kategori
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Jumlah
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px]">
              Deskripsi
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold rounded-tr-lg text-center text-[14px]">
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
                <td className="tanggal px-3 text-[14px] font-normal text-left">
                  {formatDate(data.timestamp)}
                </td>
                <td className="kategori-penjualan px-3 text-[14px] font-normal text-left">
                  {data.productName}
                </td>
                <td className="kategori-penjualan px-3 text-[14px] font-normal text-left">
                  {data.category}
                </td>
                <td className="jumlah px-3 text-[14px] font-normal text-left">
                  Rp. {data.amount.toLocaleString("id-ID")}
                </td>
                <td className="deskripsi px-3 text-[14px] font-normal text-left">
                  {data.description}
                </td>
                <td className="aksi flex justify-center">
                  <Link href={`/pendapatan/edit/${data.id}`}>
                    <button className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-gray-100">
                      <Edit2 size="18" color="#797B8C" variant="Bold" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-red-100"
                  >
                    <Trash size="18" color="#F74B4B" variant="Bold" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="md:hidden space-y-3 mt-4">
        {item &&
          item.map((data, index) => (
            <div
              key={data.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              {/* Nomor Index */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  No: {index + 1}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {data.category}
                </span>
              </div>

              {/* Info utama */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {data.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(data.timestamp)}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-medium">Jumlah:</span> Rp.{" "}
                  {data.amount.toLocaleString("id-ID")}
                </p>
                {data.description && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Deskripsi:</span>{" "}
                    {data.description}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 mt-3">
                <Link href={`/pendapatan/edit/${data.id}`}>
                  <button className="p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <Edit2 size="18" color="#797B8C" variant="Bold" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(data.id)}
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
