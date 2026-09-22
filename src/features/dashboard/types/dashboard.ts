export type DashboardParams = {
  startDate: string;
  endDate: string;
};

export type DashboardResponse = {
  totalCashIn: number;
  totalCashOut: number;
  totalSales: number;
  totalRestocks: number;
  totalLoans: number;
  totalReturns: number;
};
