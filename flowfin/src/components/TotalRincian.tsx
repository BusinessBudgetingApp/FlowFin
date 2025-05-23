import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRealTimeUpdate } from "@/hooks/useRealtimeUpdate";
import { IncomeTransaction } from "@/types/transaction";
import Image from "next/image";

export function TotalRincian() {
  const { user } = useAuth();
  const allPendapatan: IncomeTransaction[] = useRealTimeUpdate("pendapatan");
  const allPengeluaran: IncomeTransaction[] = useRealTimeUpdate("pengeluaran");

  const [pendapatan, setPendapatan] = useState<number>(0);
  const [pengeluaran, setPengeluaran] = useState<number>(0);

  useEffect(() => {
    if (user) {
      const userPendapatan = allPendapatan
        .filter((t) => t.userId === user.uid)
        .reduce((total, t) => total + t.amount, 0);

      const userPengeluaran = allPengeluaran
        .filter((t) => t.userId === user.uid)
        .reduce((total, t) => total + t.amount, 0);

      setPendapatan(userPendapatan);
      setPengeluaran(userPengeluaran);
    }
  }, [user, allPendapatan, allPengeluaran]);

  return (
    <div className="content bg-white rounded-md shadow col-span-1 sm:col-span-2 md:col-span-4">
      <h2 className="text-base md:text-lg font-bold p-4 border-b mb-2">
        Total Rincian Transaksi
      </h2>
      <div className="space-y-4 p-4 w-full">
        <div className="flex items-center p-3 md:p-4 border border-gray-200 rounded-md">
          <div className="mr-3 md:mr-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center relative">
              <Image
                src="/icons/pemasukan.svg"
                alt="Pemasukan Icon"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-lg md:text-2xl font-bold">
              Rp {pendapatan.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              Total Pendapatan
            </p>
          </div>
        </div>

        <div className="flex items-center p-3 md:p-4 border border-gray-200 rounded-md">
          <div className="mr-3 md:mr-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center relative">
              <Image
                src="/icons/pengeluaran.svg"
                alt="Pengeluaran Icon"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-lg md:text-2xl font-bold">
              Rp {pengeluaran.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              Total Pengeluaran
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
