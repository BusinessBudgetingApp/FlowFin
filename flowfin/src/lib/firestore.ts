import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { IncomeTransaction } from "@/types/transaction";

// fungsi add data ke firestore
export async function addData(transaction: IncomeTransaction) {
  await addDoc(collection(db, "transaction"), transaction);
}

// fungsi mengambil data dari firestore
export async function getData() {
  const q = query(collection(db, "transaction"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data as IncomeTransaction[];
}

export async function updateData(
  id: string,
  transaction: Partial<IncomeTransaction>
) {
  await updateDoc(doc(db, "transaction", id), transaction);
}

export async function deleteData(id: string) {
  await deleteDoc(doc(db, "transaction", id));
}
