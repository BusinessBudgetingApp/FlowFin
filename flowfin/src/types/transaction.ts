export interface IncomeTransaction {
  id?: string;
  amount: number;
  productName: string;
  category: string;
  timestamp: Date;
  transactionType?: string;
}
