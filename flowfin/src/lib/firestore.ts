import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { IncomeTransaction } from "@/types/transaction";

export async function addData(transaction: IncomeTransaction) {
  await addDoc(collection(db, "transaction"), transaction);
}

export async function updateData(id: string, transaction: Partial<IncomeTransaction>) {
  await updateDoc(doc(db, "transaction", id), transaction);
}

export async function deleteData(id: string) {
  await deleteDoc(doc(db, "transaction", id));
}