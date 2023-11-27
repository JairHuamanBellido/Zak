import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { IStockPurchase } from "./interfaces/StockPurchases.interface";
import { connectToDatabase } from "./database/connection";
import {
  getStockPreviousValue,
  getStockValueBetweenDates,
} from "./infrastructure/polygon-api";
import {
  formatDate,
  groupStockResultsByYearAndMonth,
  roundNumberTwoDecimals,
} from "./utils";
import { IPortfolio } from "./interfaces/Portfolio.interface";
import { UpdateFilter } from "mongodb";

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const jwtToken = event.headers["Authorization"] ?? "";

    // Get JWT Token
    const userId = jwtDecode(jwtToken).sub ?? "";
    const payload = JSON.parse(event.body ?? "{}");

    const previosStockValue = await getStockPreviousValue(payload.symbol);

    const performanceStock =
      ((previosStockValue.results[0].c - payload.price) / payload.price) * 100;

    const newStockPurchase: IStockPurchase = {
      userId,
      currency: payload.currency,
      date: formatDate(new Date(payload.date)),
      price: payload.price,
      quantity: payload.quantity,
      symbol: payload.symbol,
      totalCost: roundNumberTwoDecimals(payload.quantity * payload.price),
      performance: roundNumberTwoDecimals(performanceStock),
    };

    // DB Connection
    const db = await connectToDatabase();

    // MongoDB Collections access
    const stockPurchasesCollection = db.collection("stock-purchases");
    const stockPurchasesHistorialCollection = db.collection(
      "stock-purchases-historial"
    );
    const portfolioCollection = db.collection<IPortfolio>("portfolio");

    // Insert stock purchase
    const stockPurchaseMongoDBRecord = await stockPurchasesCollection.insertOne(
      newStockPurchase
    );

    const userPortfolio = await portfolioCollection.findOne({ userId });

    const actualStockPurchaseValue =
      previosStockValue.results[0].c * newStockPurchase.quantity;

    // Create or update portfolio
    if (!userPortfolio) {
      const newPortfolio: IPortfolio = {
        userId,
        investedCapital: roundNumberTwoDecimals(newStockPurchase.totalCost),
        currentValue: roundNumberTwoDecimals(actualStockPurchaseValue),
      };
      await portfolioCollection.insertOne(newPortfolio);
    } else {
      const updatePortfolio: UpdateFilter<IPortfolio> = {
        $set: {
          investedCapital: roundNumberTwoDecimals(
            userPortfolio.investedCapital + newStockPurchase.totalCost
          ),
          currentValue: roundNumberTwoDecimals(
            userPortfolio.currentValue + actualStockPurchaseValue
          ),
        },
      };

      await portfolioCollection.updateOne(
        { _id: userPortfolio._id },
        updatePortfolio
      );
    }

    // Create historical data until today
    const nextDayCreateStockPurchase = new Date(newStockPurchase.date);
    nextDayCreateStockPurchase.setDate(
      new Date(newStockPurchase.date).getDate() + 1
    );

    // Get the stock value history between to two dates from Poligon API
    const res = await getStockValueBetweenDates(
      newStockPurchase.symbol,
      nextDayCreateStockPurchase,
      new Date()
    );

    // Group the historical data into groups by year and month
    const historicalData = groupStockResultsByYearAndMonth(
      res,
      newStockPurchase,
      stockPurchaseMongoDBRecord.insertedId.toHexString()
    );

    await stockPurchasesHistorialCollection.insertMany(historicalData);
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
