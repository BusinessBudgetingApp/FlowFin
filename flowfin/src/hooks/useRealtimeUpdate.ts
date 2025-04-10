import { db } from "@/lib/firebase";
import { IncomeTransaction } from "@/types/transaction";
import {
  collection,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useRealTimeUpdate = (categoryTransaction?: string) => {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "transaction"),
      where("transactionType", "==", `${categoryTransaction}`),

      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IncomeTransaction[]
      );
    });

    return () => unsubscribe();
  }, []);

  return transactions;
};
