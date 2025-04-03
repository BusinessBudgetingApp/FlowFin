import { ArrowDown2, ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function PaginationPendapatan({
  currentPage,
  totalPages,
  setCurrentPage,
  hasPrev,
  hasNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Navigasi Halaman */}
      <div className="flex items-center justify-center pt-5 pb-2.5 gap-3">
        {/* Tombol "Sebelumnya" */}
        <button
          className={`border px-4 py-2 rounded-md text-[10px] font-medium flex items-center gap-2 ${
            hasPrev
              ? "cursor-pointer hover:bg-gray-100 text-[#212121]"
              : "cursor-not-allowed text-gray-400 border-gray-300"
          }`}
          onClick={() => hasPrev && setCurrentPage(currentPage - 1)}
          disabled={!hasPrev}
        >
          <ArrowLeft2
            size="20"
            color={hasPrev ? "#797B8C" : "#B7BBC0"}
            variant="Bold"
          />
          Sebelumnya
        </button>

        {/* Nomor Halaman */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`border px-4 py-2 rounded-md text-[10px] font-medium ${
                currentPage === page
                  ? "bg-[#00859B] text-white"
                  : "cursor-pointer hover:bg-gray-100 text-[#212121] border-[#B7BBC0]"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}

        {/* Tombol "Selanjutnya" */}
        <button
          className={`border px-4 py-2 rounded-md text-[10px] font-medium flex items-center gap-2 ${
            hasNext
              ? "cursor-pointer hover:bg-gray-100 text-[#212121]"
              : "cursor-not-allowed text-gray-400 border-gray-300"
          }`}
          onClick={() => hasNext && setCurrentPage(currentPage + 1)}
          disabled={!hasNext}
        >
          Selanjutnya
          <ArrowRight2
            size="20"
            color={hasNext ? "#797B8C" : "#B7BBC0"}
            variant="Bold"
          />
        </button>
      </div>
    </div>
  );
}
