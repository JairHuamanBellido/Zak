import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { IStockPurchase } from "./interfaces/StockPurchases.interface";
import { connectToDatabase } from "./database/connection";

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const jwtToken = event.headers["Authorization"] ?? "";

  const userId = jwtDecode(jwtToken).sub ?? "";
  const payload = JSON.parse(event.body ?? "{}");

  const newStockPurchase: IStockPurchase = {
    userId,
    currency: payload.currency,
    date: new Date(payload.date),
    price: payload.price,
    quantity: payload.quantity,
    symbol: payload.symbol,
    totalCost: payload.quantity * payload.price,
  };

  const db = await connectToDatabase();

  const stockPurchasesCollection = db.collection("stock-purchases");

  await stockPurchasesCollection.insertOne(newStockPurchase);

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Created susccessfully!" }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
