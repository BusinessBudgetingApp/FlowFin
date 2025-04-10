"use client";

import MainContentPengeluaran from "@/components/pengeluaran/MainContentPengeluaran";
import { withAuth } from "@/lib/withAuth";

function PengeluaranPage() {
  return (
    <>
      <MainContentPengeluaran />
    </>
  );
}

export default withAuth(PengeluaranPage);
