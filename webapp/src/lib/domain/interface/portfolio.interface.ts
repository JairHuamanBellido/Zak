export interface IPortfolioTimeSeriesData {
	readonly date: string;
	readonly value: number;
}

export interface IPortfolio {
	readonly totalInvestment: number;
	readonly currentBalance: number;
	readonly performance: number;
	readonly timeSeriesData: IPortfolioTimeSeriesData[];
}
