"use client";

import { formatDate } from "@/app/utils/formatDate";
import Dashboard from "@/components/home/Dashboard";
import MainContentHome from "@/components/home/MainContentHome";
import PaginationPendapatan from "@/components/pendapatan/PaginationPendapatan";
import { usePaginatedTransactions } from "@/hooks/usePaginatedTransactions";
import { withAuth } from "@/lib/withAuth";

function Home() {
  return (
    <>
      <MainContentHome />
    </>
  );
}

export default withAuth(Home);
