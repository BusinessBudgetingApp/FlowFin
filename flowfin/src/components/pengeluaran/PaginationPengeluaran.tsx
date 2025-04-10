import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function PaginationPengeluaran({
  currentPage,
  totalPages,
  setCurrentPage,
  hasPrev,
  hasNext,
}: PaginationProps) {
  // Hitung range halaman yang ditampilkan (maksimal 3)
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  const pagesToShow = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="flex items-center justify-center py-3 md:py-5 gap-1 md:gap-2 flex-wrap text-[10px] md:text-[12px] md:bg-white">
      {/* Tombol "Sebelumnya" */}
      <button
        className={`border px-2 py-1 md:px-3 md:py-2 rounded-md font-medium flex items-center gap-1 ${
          hasPrev
            ? "cursor-pointer hover:bg-gray-100 text-[#212121]"
            : "cursor-not-allowed text-gray-400 border-gray-300"
        }`}
        onClick={() => hasPrev && setCurrentPage(currentPage - 1)}
        disabled={!hasPrev}
      >
        <ArrowLeft2
          size="14" // Mobile
          color={hasPrev ? "#797B8C" : "#B7BBC0"}
          variant="Bold"
        />
        <span>Sebelumnya</span>
      </button>

      {/* Nomor Halaman (maksimal 3, tetap tampil di mobile) */}
      <div className="flex gap-1 md:gap-2 overflow-x-auto max-w-full scrollbar-hide">
        {pagesToShow.map((page) => (
          <button
            key={page}
            className={`border px-2 py-1 md:px-3 md:py-2 rounded-md font-medium min-w-[28px] md:min-w-[36px] cursor-pointer ${
              currentPage === page
                ? "bg-[#00859B] text-white"
                : "hover:bg-gray-100 text-[#212121] border-[#B7BBC0]"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Tombol "Selanjutnya" */}
      <button
        className={`border px-2 py-1 md:px-3 md:py-2 rounded-md font-medium flex items-center gap-1 ${
          hasNext
            ? "cursor-pointer hover:bg-gray-100 text-[#212121]"
            : "cursor-not-allowed text-gray-400 border-gray-300"
        }`}
        onClick={() => hasNext && setCurrentPage(currentPage + 1)}
        disabled={!hasNext}
      >
        <span>Selanjutnya</span>
        <ArrowRight2
          size="14" // Mobile
          color={hasNext ? "#797B8C" : "#B7BBC0"}
          variant="Bold"
        />
      </button>
    </div>
  );
}
