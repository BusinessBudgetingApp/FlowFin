import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { Transaction } from "@/types/transaction";

export async function addData(transaction: Transaction) {
  await addDoc(collection(db, "transaction"), transaction);
}
