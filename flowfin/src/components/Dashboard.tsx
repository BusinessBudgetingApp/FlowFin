export default function Dashboard() {
    return (
      <div className="main-content px-4 py-4 sm:px-6 sm:py-6 h-[100vh] overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5">
          <div className="content bg-white p-3 sm:p-4 rounded-md sm:col-span-3">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Total Rincian Transaksi
            </h2>
            <div className="space-y-3 sm:space-y-4">
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
                  <p className="text-gray-500 text-sm sm:text-base">Total Pendapatan</p>
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
                  <p className="text-gray-500 text-sm sm:text-base">Total Pengeluaran</p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="content bg-white p-3 sm:p-4 rounded-md sm:col-span-9">
          </div>
        </div>
      </div>
    );
  }