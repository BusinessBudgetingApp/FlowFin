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

export async function addData(transaction: IncomeTransaction) {
  await addDoc(collection(db, "transaction"), transaction);
}

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
  try {
    const docRef = doc(db, "transaction", id); 
    await updateDoc(docRef, transaction);
    console.log(`Data with ID ${id} successfully updated.`);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

export async function deleteData(id: string) {
  await deleteDoc(doc(db, "transaction", id));
}
