import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { IncomeTransaction } from "@/types/transaction";

export async function addData(transaction: IncomeTransaction) {
  await addDoc(collection(db, "transaction"), transaction);
}
