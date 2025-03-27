export default function AddPendapatanPage() {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        {/* Header */}
        <h2 className="text-xl text-black font-semibold mb-4 flex items-center gap-2 border-b pb-2 border-gray-300">
          <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
          Tambah Data Pendapatan
        </h2>
  
        {/* Form */}
        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700">Tanggal</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              />
            </div>
  
            <div className="flex-1">
              <label className="block text-gray-700">Kategori Pendapatan</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Kategori</option>
                <option value="Gaji">Gaji</option>
                <option value="Bonus">Bonus</option>
                <option value="Investasi">Investasi</option>
              </select>
            </div>
  
            <div className="flex-1">
              <label className="block text-gray-700">Jumlah Pendapatan</label>
              <input
                type="number"
                placeholder="Jumlah Pendapatan"
                className="w-full p-2 border border-gray-300 text-gray-600 rounded-md placeholder-gray-400"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-gray-700">Deskripsi Transaksi</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400"
              placeholder="Deskripsi Transaksi"
              maxLength={100}
            />
            <p className="text-gray-400 text-sm">0/100</p>
          </div>
  
          <div className="flex justify-end">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    );
  }
  