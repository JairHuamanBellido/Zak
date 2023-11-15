export interface IStockPurchase {
  readonly date: Date;
  readonly symbol: string;
  readonly quantity: number;
  readonly price: number;
  readonly totalCost: number;
  readonly currency: string;
  readonly userId: string;
}
