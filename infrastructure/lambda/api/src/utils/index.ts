import { IPolygonPreviousClose } from "../interfaces/Polygon.interface";
import { IStockPurchase } from "../interfaces/StockPurchases.interface";

export const roundNumberTwoDecimals = (number: number) =>
  Math.round(number * 100) / 100;

export const formatDate = (date: Date) => date.toISOString().substring(0, 10);

export const groupStockResultsByYearAndMonth = (
  polygonAPIresponse: IPolygonPreviousClose,
  newStockCreated: IStockPurchase,
  transactionId: string
) => {
  let historicalData: {
    year: number;
    month: number;
    startDate: string;
    transactionId: string;
    results_per_day: any[];
  }[] = [];
  polygonAPIresponse.results.forEach((polygonResult) => {
    const stockDate = new Date(polygonResult.t);
    const year = stockDate.getFullYear();
    const month = stockDate.getMonth();

    const isRecordByMontAndYearExists = historicalData.find(
      (data) => data.year === year && data.month === month
    );

    if (isRecordByMontAndYearExists) {
      isRecordByMontAndYearExists.results_per_day.push({
        date: formatDate(new Date(polygonResult.t)),
        value: roundNumberTwoDecimals(
          newStockCreated.quantity * polygonResult.c
        ),
      });
    } else {
      historicalData.push({
        month,
        year,
        transactionId,
        startDate: formatDate(new Date(`${year}-${month}-01`)),
        results_per_day: [
          {
            date: formatDate(new Date(polygonResult.t)),
            value: roundNumberTwoDecimals(
              newStockCreated.quantity * polygonResult.c
            ),
          },
        ],
      });
    }
  });

  return historicalData;
};
