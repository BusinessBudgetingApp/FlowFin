export default function TotalRincian({
  pendapatan,
  pengeluaran,
}: {
  pendapatan: number;
  pengeluaran: number;
}) {
  return (
    <div className="content bg-white rounded-md col-span-4">
      <h2 className="text-lg font-bold p-4 border-b mb-2">
        Total Rincian Transaksi
      </h2>
      <div className="space-y-4 p-4 w-full">
        <div className="flex items-center p-4 border border-gray-200 rounded-md">
          <div className="mr-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <img
                src="/icons/pemasukan.svg"
                alt="Pemasukan Icon"
                className="w-9 h-9"
              />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">Rp. {pendapatan}</p>
            <p className="text-gray-500 text-base">Total Pendapatan</p>
          </div>
        </div>

        <div className="flex items-center p-4 border border-gray-200 rounded-md">
          <div className="mr-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <img
                src="/icons/pengeluaran.svg"
                alt="Pengeluaran Icon"
                className="w-9 h-9"
              />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">Rp. {pengeluaran}</p>
            <p className="text-gray-500 text-base">Total Pengeluaran</p>
          </div>
        </div>
      </div>
    </div>
  );
}
