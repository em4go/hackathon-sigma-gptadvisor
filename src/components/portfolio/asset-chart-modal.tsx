"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  close: number;
}

interface StockHistoryResponse {
  symbol: string;
  name: string;
  currency: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  chartData: ChartData[];
}

interface AssetChartModalProps {
  symbol: string;
  name: string;
  group: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Period = "1W" | "1M" | "3M" | "6M" | "1Y";

const periods: { label: string; value: Period; apiValue: string }[] = [
  { label: "1W", value: "1W", apiValue: "1w" },
  { label: "1M", value: "1M", apiValue: "1mo" },
  { label: "3M", value: "3M", apiValue: "3mo" },
  { label: "6M", value: "6M", apiValue: "6mo" },
  { label: "1Y", value: "1Y", apiValue: "1y" },
];

const groupColors: Record<string, string> = {
  Crypto: "#F59E0B",
  ETFs: "#10B981",
  Stocks: "#3B82F6",
  Others: "#8B5CF6",
};

export function AssetChartModal({
  symbol,
  name,
  group,
  open,
  onOpenChange,
}: AssetChartModalProps) {
  const [data, setData] = useState<StockHistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("6M");

  useEffect(() => {
    if (open && symbol) {
      fetchStockHistory(selectedPeriod);
    }
  }, [open, symbol, selectedPeriod]);

  const fetchStockHistory = async (period: Period) => {
    const periodConfig = periods.find((p) => p.value === period);
    const apiValue = periodConfig?.apiValue || "6mo";

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stock-history?symbol=${symbol}&period=${apiValue}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stock history");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Could not load chart data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (!data) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate change based on selected period
  const getPeriodChange = () => {
    if (!data || data.chartData.length < 2) {
      return { change: data?.change || 0, changePercent: data?.changePercent || 0 };
    }

    const firstPrice = data.chartData[0].close;
    const lastPrice = data.chartData[data.chartData.length - 1].close;
    const change = lastPrice - firstPrice;
    const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;

    return { change, changePercent };
  };

  const { change, changePercent } = getPeriodChange();
  const isPositive = change >= 0;
  const color = groupColors[group] || groupColors["Stocks"];

  const getPeriodLabel = (period: Period): string => {
    const labels: Record<Period, string> = {
      "1W": "1 Week",
      "1M": "1 Month",
      "3M": "3 Months",
      "6M": "6 Months",
      "1Y": "1 Year",
    };
    return labels[period];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center size-10 rounded-full"
              style={{ backgroundColor: `${color}20` }}
            >
              {isPositive ? (
                <TrendingUp className="size-5" style={{ color }} />
              ) : (
                <TrendingDown className="size-5" style={{ color }} />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl">{symbol}</DialogTitle>
              <p className="text-sm text-muted-foreground truncate">
                {data?.name || name}
              </p>
            </div>
          </div>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        )}

        {data && !loading && !error && (
          <div className="space-y-4">
            {/* Price Info */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-bold">
                  {formatCurrency(data.currentPrice)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="size-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="size-4 text-red-500" />
                )}
                <span
                  className={`font-medium ${
                    isPositive ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatCurrency(change)} (
                  {isPositive ? "+" : ""}
                  {changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 11, fill: "#888" }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                    tick={{ fontSize: 11, fill: "#888" }}
                    tickLine={false}
                    axisLine={false}
                    domain={["auto", "auto"]}
                    width={60}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), "Close"]}
                    labelFormatter={(label) => formatDate(String(label))}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke={color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorClose)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Period selector */}
            <div className="flex justify-center gap-1">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`text-xs px-3 ${
                    selectedPeriod === period.value
                      ? ""
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period.label}
                </Button>
              ))}
            </div>

            {/* Period label */}
            <div className="flex justify-center text-xs text-muted-foreground">
              {getPeriodLabel(selectedPeriod)} Change
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
