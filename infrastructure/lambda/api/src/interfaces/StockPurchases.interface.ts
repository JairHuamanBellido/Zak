export interface IStockPurchase {
  readonly date: string;
  readonly symbol: string;
  readonly quantity: number;
  readonly price: number;
  readonly totalCost: number;
  readonly currency: string;
  readonly userId: string;
  readonly performance: number;
}
