import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

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
  const handlePrevClick = () => {
    if (hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-center py-3 md:py-5 gap-1 md:gap-3 flex-wrap md:bg-white">
  {/* Tombol "Sebelumnya" */}
  <button
    className={`border px-2 md:px-3 py-1 md:py-2 rounded-md text-[10px] md:text-[12px] font-medium flex items-center gap-1 md:gap-2 ${
      hasPrev
        ? "cursor-pointer hover:bg-gray-100 text-[#212121]"
        : "cursor-not-allowed text-gray-400 border-gray-300"
    }`}
    onClick={handlePrevClick}
    disabled={!hasPrev}
  >
    <ArrowLeft2
      size="14" // Mobile
      color={hasPrev ? "#797B8C" : "#B7BBC0"}
      variant="Bold"
    />
    <span>Sebelumnya</span>
  </button>

  {/* Nomor Halaman */}
  <div className="flex gap-1 md:gap-2 overflow-x-auto max-w-full scrollbar-hide">
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;
      return (
        <button
          key={page}
          className={`border px-2 md:px-3 py-1 md:py-2 rounded-md text-[10px] md:text-[12px] font-medium min-w-[28px] md:min-w-[36px] ${
            currentPage === page
              ? "bg-[#00859B] text-white"
              : "cursor-pointer hover:bg-gray-100 text-[#212121] border-[#B7BBC0]"
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      );
    })}
  </div>

  {/* Tombol "Selanjutnya" */}
  <button
    className={`border px-2 md:px-3 py-1 md:py-2 rounded-md text-[10px] md:text-[12px] font-medium flex items-center gap-1 md:gap-2 ${
      hasNext
        ? "cursor-pointer hover:bg-gray-100 text-[#212121]"
        : "cursor-not-allowed text-gray-400 border-gray-300"
    }`}
    onClick={handleNextClick}
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
