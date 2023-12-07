import { axiosHttp } from "../core/axios-http";
import { IPolygonPreviousClose } from "../interfaces/Polygon.interface";
import { config } from "dotenv";
import { formatDate } from "../utils";

config();

export const getStockPreviousValue = async (stock: string) => {
  const params = {
    adjusted: true,
    apiKey: process.env.POLYGON_API_KEY,
  };
  return await axiosHttp
    .get<IPolygonPreviousClose>(`/aggs/ticker/${stock}/prev`, { params })
    .then((res) => res.data);
};

export const getStockValueBetweenDates = async (
  stock: string,
  startDate: Date,
  endDate: Date
) => {
  const startDateFormated = formatDate(startDate);
  const endDateFormated = formatDate(endDate);
  const params = {
    adjusted: true,
    apiKey: process.env.POLYGON_API_KEY,
    sort: "asc",
  };

  return await axiosHttp
    .get<IPolygonPreviousClose>(
      `/aggs/ticker/${stock}/range/1/day/${startDateFormated}/${endDateFormated}`,
      { params }
    )
    .then((res) => res.data);
};
