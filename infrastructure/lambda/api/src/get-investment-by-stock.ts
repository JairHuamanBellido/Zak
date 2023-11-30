import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { connectToDatabase } from "./database/connection";
import { IStockPurchase } from "./interfaces/StockPurchases.interface";
import { roundNumberTwoDecimals } from "./utils";

function calculateTotalPortfolioValue(transactions: IStockPurchase[]): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.totalCost,
    0
  );
}

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const jwtToken = event.headers["Authorization"] ?? "";
    const userId = jwtDecode(jwtToken).sub ?? "";
    const db = await connectToDatabase();
    const stockPurchasesCollection =
      db.collection<IStockPurchase>("stock-purchases");

    const stockPurchasesByUser = await stockPurchasesCollection
      .find({
        userId,
      })
      .toArray();

    const uniqueSymbols = Array.from(
      new Set(stockPurchasesByUser.map((stockPurchase) => stockPurchase.symbol))
    );

    const summaries = uniqueSymbols.map((symbol) => {
      const filteredTransactions = stockPurchasesByUser.filter(
        (transaction) => transaction.symbol === symbol
      );
      const totalInvestment = filteredTransactions.reduce(
        (total, transaction) => total + transaction.totalCost,
        0
      );
      const percentageOfTotal =
        (totalInvestment / calculateTotalPortfolioValue(stockPurchasesByUser)) *
        100;
      return {
        symbol: symbol,
        totalInvestment: totalInvestment,
        percentageOfTotal: roundNumberTwoDecimals(percentageOfTotal),
      };
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(summaries),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
