import { db } from "@/lib/firebase";
import { IncomeTransaction } from "@/types/transaction";
import {
  collection,
  getDocs,
  DocumentSnapshot,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const usePaginatedTransactions = (
  userId?: string,
  categoryTransaction?: string,
  pageLimit = 8
) => {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSnapshots, setPageSnapshots] = useState<DocumentSnapshot[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async (page: number) => {
    setIsLoading(true);

    const productRef = collection(db, "transaction");

    // Build filter conditions
    const conditions = [
      where("userId", "==", userId),
      ...(categoryTransaction
        ? [where("transactionType", "==", categoryTransaction)]
        : []),
      orderBy("timestamp", "desc"),
    ];

    let q;

    if (page === 1) {
      q = query(productRef, ...conditions, limit(pageLimit));
    } else {
      const lastSnapshot = pageSnapshots[page - 2]; // page-2 = halaman sebelumnya
      if (!lastSnapshot) {
        setIsLoading(false);
        return;
      }
      q = query(
        productRef,
        ...conditions,
        startAfter(lastSnapshot),
        limit(pageLimit)
      );
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IncomeTransaction[];

    setTransactions(data);
    setCurrentPage(page);

    // Simpan snapshot terakhir
    if (querySnapshot.docs.length > 0) {
      setPageSnapshots((prev) => {
        const newSnapshots = [...prev];
        newSnapshots[page - 1] =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        return newSnapshots;
      });
    }

    // Hitung total halaman (hanya sekali di halaman 1)
    if (page === 1) {
      const total = (await getDocs(query(productRef, ...conditions))).size;
      setTotalPages(Math.ceil(total / pageLimit));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, categoryTransaction, currentPage]);

  return {
    transactions,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    refetch: () => fetchTransactions(currentPage),
  };
};
