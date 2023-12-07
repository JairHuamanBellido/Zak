import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { connectToDatabase } from "./database/connection";
import { IStockPurchase } from "./interfaces/StockPurchases.interface";

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const jwtToken = event.headers["Authorization"] ?? "";

    const userId = jwtDecode(jwtToken).sub ?? "";

    const db = await connectToDatabase();

    const stockPurchasesCollection =
      db.collection<IStockPurchase>("stock-purchases");

    const stockPurchases = await stockPurchasesCollection
      .find<IStockPurchase>({
        userId,
      })
      .toArray();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(stockPurchases),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ error: new Error(error).message ?? "" }),
    };
  }
};
