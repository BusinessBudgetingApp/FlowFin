import { Timestamp } from "firebase/firestore";

export interface IncomeTransaction {
  id?: string;
  amount: number;
  productName: string;
  category: string;
  timestamp: Timestamp;
  transactionType?: string;
  description: string;
  userId?: string; // Optional user ID field
}
