export interface IPolygonPreviousClose {
  readonly ticker: string;
  readonly adjusted: boolean;
  readonly results: {
    /**
     * The close price for the symbol in the given time period.
     */
    readonly c: number;
    /**
     * timestamp
     */
    readonly t: number;
  }[];
}
