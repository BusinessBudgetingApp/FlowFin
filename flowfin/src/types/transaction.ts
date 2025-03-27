export interface IncomeTransaction {
  amount: number;
  productName: string;
  category: string;
  timestamp: Date;
  transactionType?: string;
}
