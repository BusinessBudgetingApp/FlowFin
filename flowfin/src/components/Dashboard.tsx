import AnimatedDropdown, { DropdownItem } from "./AnimatedDropdown";

export default function Dashboard() {
  return (
    <div className="main-content px-4 py-4 sm:px-6 sm:py-6 h-[100vh] overflow-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-5">
        <div className="content bg-white rounded-md xl:col-span-3">
          <h2 className="text-base sm:text-lg font-bold p-3 sm:p-4 border-b mb-2">
            Total Rincian Transaksi
          </h2>
          <div className="space-y-3 sm:space-y-4 p-3 sm:p-4">
            <div className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-md">
              <div className="mr-3 sm:mr-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <img
                    src="/icons/pemasukan.svg"
                    alt="Pemasukan Icon"
                    className="w-7 h-7 sm:w-9 sm:h-9"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">Rp. 2.370.000</p>
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Pendapatan
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-md">
              <div className="mr-3 sm:mr-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <img
                    src="/icons/pengeluaran.svg"
                    alt="Pengeluaran Icon"
                    className="w-7 h-7 sm:w-9 sm:h-9"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">Rp. 2.370.000</p>
                <p className="text-gray-500 text-sm sm:text-base">
                  Total Pengeluaran
                </p>
              </div>
            </div>
          </div>
        </div>

       <div className="content bg-white rounded-md xl:col-span-9">
          <div className="flex justify-between p-3 sm:p-4 border-b">
            <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-0">
              <h2 className="text-base sm:text-lg font-bold">
                Pendapatan VS Pengeluaran
              </h2>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500">
                Berdasarkan kategori transaksi
              </h4>
            </div>
            <AnimatedDropdown label="2025" className="w-full">
              <DropdownItem>2024</DropdownItem>
              <DropdownItem>2023</DropdownItem>
              <DropdownItem>2022</DropdownItem>
              <DropdownItem>2021</DropdownItem>
            </AnimatedDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
