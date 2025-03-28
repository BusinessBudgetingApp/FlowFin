import { db } from "@/lib/firebase";
import { Transaction } from "@/types/transaction";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const realTimeUpdate = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "transaction"),
      (snapshot) => {
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[]
        );
      }
    );

    return () => unsubscribe();
  }, []);
};
