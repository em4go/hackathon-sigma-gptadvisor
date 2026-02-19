import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

interface HistoricalItem {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjClose?: number;
}

interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface QuoteInfo {
  shortName?: string;
  longName?: string;
  currency?: string;
  regularMarketPrice?: number;
  regularMarketPreviousClose?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const period = searchParams.get("period") || "6mo";

  if (!symbol) {
    return NextResponse.json(
      { error: "Symbol is required" },
      { status: 400 }
    );
  }

  // Map symbols to Yahoo Finance format
  const symbolMap: Record<string, string> = {
    BTC: "BTC-USD",
    ETH: "ETH-USD",
    SOL: "SOL-USD",
  };

  const yahooSymbol = symbolMap[symbol.toUpperCase()] || symbol;

  try {
    // Map period to Yahoo Finance interval
    type Interval = "1d" | "1wk" | "1mo";
    
    const periodMap: Record<string, { period1: string; interval: Interval }> = {
      "1w": {
        period1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1d",
      },
      "1mo": {
        period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1d",
      },
      "3mo": {
        period1: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1d",
      },
      "6mo": {
        period1: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1wk",
      },
      "1y": {
        period1: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1wk",
      },
      "2y": {
        period1: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1mo",
      },
      "5y": {
        period1: new Date(Date.now() - 1825 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        interval: "1mo",
      },
    };

    const { period1, interval } = periodMap[period] || periodMap["6mo"];

    const quote = (await yahooFinance.historical(yahooSymbol, {
      period1,
      period2: new Date().toISOString().split("T")[0],
      interval,
    })) as HistoricalItem[];

    // Transform data for the chart
    const chartData: HistoricalData[] = quote.map((item) => ({
      date: item.date.toISOString().split("T")[0],
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
    }));

    // Get current quote info
    const quoteInfo = (await yahooFinance.quote(yahooSymbol)) as QuoteInfo;

    return NextResponse.json({
      symbol,
      name: quoteInfo.shortName || quoteInfo.longName || yahooSymbol,
      currency: quoteInfo.currency || "USD",
      currentPrice: quoteInfo.regularMarketPrice,
      previousClose: quoteInfo.regularMarketPreviousClose,
      change: quoteInfo.regularMarketChange,
      changePercent: quoteInfo.regularMarketChangePercent,
      chartData,
    });
  } catch (error) {
    console.error("Error fetching stock history:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock history" },
      { status: 500 }
    );
  }
}
