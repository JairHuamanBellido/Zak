export interface ICreateStockPurchase {
	readonly date: Date;
	readonly symbol: string;
	readonly quantity: number;
	readonly price: number;
	readonly currency: string;
}

export interface IStockPurchasesAPI {
	readonly _id: string;
	readonly userId: string;
	readonly currency: string;
	readonly date: Date;
	readonly price: number;
	readonly quantity: number;
	readonly symbol: string;
	readonly totalCost: number;
}
