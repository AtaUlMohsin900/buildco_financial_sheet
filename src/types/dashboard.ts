export interface TransactionData {
  srNo: number;
  date: string;
  description: string;
  received: number;
  paid: number;
  details: string;
}

export interface DashboardStats {
  totalTransactions: number;
  totalReceived: number;
  totalPaid: number;
  netBalance: number;
  averageTransaction: number;
  latestDate: string;
}
