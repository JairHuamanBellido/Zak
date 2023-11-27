export interface IStockPurchaseHistory {
  readonly month: number;
  readonly year: number;
  readonly transactionId: string;
  readonly startDate: string;
  readonly results_per_day: {
    readonly date: string;
    readonly value: number;
  }[];
}
