import { formatDate } from "@/app/utils/formatDate";
import { IncomeTransaction } from "@/types/transaction";
import { Edit2, Trash } from "iconsax-react";
import Link from "next/link";

export default function DataTablePendapatan({
  item,
  currentPage,
  onDelete,
}: {
  item: IncomeTransaction[];
  currentPage: number;
  onDelete: (id?: string) => void;
}) {
  const truncateDescription = (desc: string, limit = 25) => {
    return desc.length > limit ? `${desc.slice(0, limit)}...` : desc;
  };

  return (
    <div className="overflow-x-auto md:bg-white">
      {/* Desktop Table */}
      <table className="hidden md:table table-auto w-full text-left">
        <thead>
          <tr>
            <th className="bg-gray-100 px-3 py-2 font-semibold  text-[14px] text-center border-y-1 border-gray-200">
              No
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px] border-y-1 border-gray-200">
              Tanggal
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px] border-y-1 border-gray-200">
              Nama Produk/Layanan
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px] border-y-1 border-gray-200">
              Kategori
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px] border-y-1 border-gray-200">
              Jumlah
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-left text-[14px] border-y-1 border-gray-200">
              Deskripsi
            </th>
            <th className="bg-gray-100 px-3 py-2 font-semibold text-center text-[14px] border-y-1 border-gray-200">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {item &&
            item.map((data, index) => (
              <tr key={data.id} className="border-b-2 border-gray-200">
                <td className="px-3 text-[14px] font-normal">
                  {(currentPage - 1) * 8 + index + 1}
                </td>
                <td className="px-3 text-[14px] font-normal text-left">
                  {formatDate(data.timestamp)}
                </td>
                <td className="px-3 text-[14px] font-normal text-left capitalize">
                  {data.productName}
                </td>
                <td className="px-3 text-[14px] font-normal text-left capitalize">
                  {data.category}
                </td>
                <td className="px-3 text-[14px] font-normal text-left">
                  Rp {data.amount.toLocaleString("id-ID")}
                </td>
                <td className="px-3 text-[14px] font-normal text-left capitalize">
                  {truncateDescription(data.description || "")}
                </td>
                <td className="flex justify-center">
                  <Link href={`/pendapatan/edit/${data.id}`}>
                    <button className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-gray-100">
                      <Edit2 size="18" color="#797B8C" variant="Bold" />
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(data.id)}
                    className="p-3 rounded-md cursor-pointer mx-1 my-1.5 hover:bg-red-100"
                  >
                    <Trash size="18" color="#F74B4B" variant="Bold" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Mobile / Tablet View */}
      <div className="md:hidden space-y-3 mt-4">
        {item &&
          item.map((data, index) => (
            <div
              key={data.id}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              {/* Header Info */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  No: {(currentPage - 1) * 8 + index + 1}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded capitalize">
                  {data.category}
                </span>
              </div>

              {/* Main Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 capitalize">
                    {data.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(data.timestamp)}
                  </p>
                </div>
              </div>

              {/* Amount & Description */}
              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-medium">Jumlah:</span> Rp{" "}
                  {data.amount.toLocaleString("id-ID")}
                </p>
                {data.description && (
                  <p className="text-sm mt-1 capitalize">
                    <span className="font-medium">Deskripsi:</span>{" "}
                    {truncateDescription(data.description)}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 mt-3">
                <Link href={`/pendapatan/edit/${data.id}`}>
                  <button className="p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <Edit2 size="18" color="#797B8C" variant="Bold" />
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(data.id)}
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
