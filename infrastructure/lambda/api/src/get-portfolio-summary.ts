import { APIGatewayEvent } from "aws-lambda";
import { jwtDecode } from "jwt-decode";
import { connectToDatabase } from "./database/connection";
import { IStockPurchase } from "./interfaces/StockPurchases.interface";
import { IStockPurchaseHistory } from "./interfaces/StockPurchaseHistory.interface";
import { formatDate, roundNumberTwoDecimals } from "./utils";
import { IPortfolio } from "./interfaces/Portfolio.interface";

export const handler = async (event: APIGatewayEvent, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const jwtToken = event.headers["Authorization"] ?? "";

    const userId = jwtDecode(jwtToken).sub ?? "";

    const db = await connectToDatabase();

    const stockPurchasesCollection =
      db.collection<IStockPurchase>("stock-purchases");

    const stockPurchasesHistorialCollection =
      db.collection<IStockPurchaseHistory>("stock-purchases-historial");

    const portfolioCollection = db.collection<IPortfolio>("portfolio");

    const userPortfolio = await portfolioCollection.findOne({ userId });

    if (!userPortfolio) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Portfolio not found!" }),
      };
    }
    // Get stock purchases
    const userStockPurchases = await stockPurchasesCollection
      .find({ userId })
      .toArray();

    const userStockPurchasesHistory = await stockPurchasesHistorialCollection
      .find({
        transactionId: {
          $in: userStockPurchases.map((e) => e._id.toHexString()),
        },
      })
      .toArray();

    let accumulateValueByDate: { [date: string]: { value: number } } = {};

    userStockPurchases.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    userStockPurchasesHistory.sort(
      (a, b) => +new Date(a.startDate) - +new Date(b.startDate)
    );

    userStockPurchases.forEach((stockPurchase) => {
      const stockDatePrice = formatDate(new Date(stockPurchase.date));
      if (accumulateValueByDate[stockDatePrice]) {
        accumulateValueByDate = {
          ...accumulateValueByDate,
          [stockDatePrice]: {
            value: roundNumberTwoDecimals(
              accumulateValueByDate[stockDatePrice].value +
                stockPurchase.totalCost
            ),
          },
        };
      } else {
        accumulateValueByDate = {
          ...accumulateValueByDate,
          [stockDatePrice]: {
            value: roundNumberTwoDecimals(stockPurchase.totalCost),
          },
        };
      }
    });

    userStockPurchasesHistory.forEach((stockPurchase) => {
      stockPurchase.results_per_day.forEach((stockPriceByDate) => {
        const date = formatDate(new Date(stockPriceByDate.date));

        if (accumulateValueByDate[date]) {
          accumulateValueByDate = {
            ...accumulateValueByDate,
            [date]: {
              value: roundNumberTwoDecimals(
                accumulateValueByDate[date].value + stockPriceByDate.value
              ),
            },
          };
        } else {
          accumulateValueByDate = {
            ...accumulateValueByDate,
            [date]: {
              value: roundNumberTwoDecimals(stockPriceByDate.value),
            },
          };
        }
      });
    });

    const dates = Object.keys(accumulateValueByDate);

    dates.sort((a, b) => +new Date(a) - +new Date(b));

    const orderedDate: { date: string; value: number }[] = [];
    dates.forEach((date) => {
      orderedDate.push({ date, value: accumulateValueByDate[date].value });
    });

    const portfolioPerformance = roundNumberTwoDecimals(
      ((userPortfolio.currentValue - userPortfolio.investedCapital) /
        userPortfolio.investedCapital) *
        100
    );

    const response = {
      totalInvestment: userPortfolio?.investedCapital,
      currentBalance: userPortfolio?.currentValue,
      performance: portfolioPerformance,
      timeSeriesData: orderedDate,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: new Error(error).message ?? "" }),
    };
  }
};
