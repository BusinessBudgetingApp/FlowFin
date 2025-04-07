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
  categoryTransaction?: string,
  pageLimit = 8
) => {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [prevPagesLastVisible, setPrevPagesLastVisible] = useState<
    DocumentSnapshot[]
  >(
    [] // Menyimpan lastVisible untuk setiap halaman sebelumnya
  );

  // Fetch transactions saat halaman berubah
  const fetchTransactions = async (page = 1) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const productRef = collection(db, "transaction");
      let conditions = [
        where("transactionType", "==", categoryTransaction),
        orderBy("timestamp", "desc"),
      ];
      if (!categoryTransaction) {
        conditions = [orderBy("timestamp", "desc")];
      }
      let q = query(productRef, ...conditions, limit(pageLimit));

      if (page > 1 && prevPagesLastVisible[page - 2]) {
        // Gunakan lastVisible dari halaman sebelumnya
        q = query(
          productRef,
          ...conditions,
          startAfter(prevPagesLastVisible[page - 2]), // Mulai mengambil data setelah halaman sebelumnya
          limit(pageLimit)
        );
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IncomeTransaction[];

      setTransactions(data);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update lastVisible untuk halaman sekarang

      // Jika halaman baru, simpan lastVisible ke dalam array
      if (page > 1) {
        setPrevPagesLastVisible((prev) => [
          ...prev,
          querySnapshot.docs[querySnapshot.docs.length - 1],
        ]);
      }

      setCurrentPage(page);
      setIsLoading(false);

      // Hitung total halaman hanya sekali di awal
      if (page === 1) {
        const totalProduct = (await getDocs(query(productRef, ...conditions)))
          .size;
        setTotalPages(Math.ceil(totalProduct / pageLimit));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  return {
    transactions,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};
