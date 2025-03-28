import AnimatedDropdown, { DropdownItem } from "./AnimatedDropdown";
import Chart from "./Chart";
import TotalRincian from "./TotalRincian";

export default function Dashboard() {
  return (
    <div className="main-content px-6 py-6 h-[100vh] overflow-auto">
      <div className="grid grid-cols-12 gap-5">
       <TotalRincian/>

       <div className="content bg-white rounded-md col-span-9">
          <div className="flex justify-between p-4 border-b">
            <div className="flex flex-col gap-2 mb-0">
              <h2 className="text-lg font-bold">
                Pendapatan VS Pengeluaran
              </h2>
              <h4 className="text-sm font-medium text-gray-500">
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
          <Chart/>
        </div>
      </div>
    </div>
  );
}
