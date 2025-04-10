import { IncomeTransaction } from "@/types/transaction";
import { getData } from "./firestore";
import { Timestamp } from "firebase/firestore";

export async function getDataByMonth(
  userId?: string,
  month?: number,
  year?: number
) {
  try {
    const getTransactions: IncomeTransaction[] = await getData();
    const transactions = getTransactions.filter((t) => t.userId === userId); // Filter berdasarkan userId

    const filteredTransactions = transactions.filter((t) => {
      if (!t.timestamp) return false; // Pastikan timestamp ada

      const transactionDate = (t.timestamp as Timestamp).toDate(); // Konversi Firestore Timestamp ke JavaScript Date

      return (
        transactionDate.getMonth() + 1 === month &&
        transactionDate.getFullYear() === year
      );
    });
    // Kelompokkan pemasukan dan pengeluaran
    const pemasukan = filteredTransactions
      .filter((t) => t.transactionType === "pendapatan") // Sesuaikan dengan Firestore
      .map((t) => `Pemasukan: Rp${t.amount} - ${t.description}`);

    const pengeluaran = filteredTransactions
      .filter((t) => t.transactionType === "pengeluaran") // Sesuaikan dengan Firestore
      .map((t) => `Pengeluaran: Rp${t.amount} - ${t.description}`);

    return { pemasukan, pengeluaran };
  } catch (error) {
    console.error("Error fetching data by month:", error);
    throw error;
  }
}
