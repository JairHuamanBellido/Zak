export interface ICreateStockPurchase {
	readonly date: Date;
	readonly symbol: string;
	readonly quantity: number;
	readonly price: number;
	readonly currency: string;
}
