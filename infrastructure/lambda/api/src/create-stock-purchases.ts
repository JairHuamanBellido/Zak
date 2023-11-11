import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { ICreateStockPurchase } from "./interfaces/StockPurchases.interface";
import { config } from "dotenv";
import { Db, MongoClient } from "mongodb";
config();

const uri = process.env.MONGODB_URI || "";

let cacheDb: Db | null = null;

async function connectToDatabase() {
  if (cacheDb) {
    return cacheDb;
  }

  const client = await MongoClient.connect(uri);
  const db = await client.db("zak");

  cacheDb = db;
  return db;
}

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const jwtToken = event.headers["Authorization"] ?? "";

  const userId = jwtDecode(jwtToken).sub ?? "";
  const payload = JSON.parse(event.body ?? "{}");

  const newStockPurchase: ICreateStockPurchase = {
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
