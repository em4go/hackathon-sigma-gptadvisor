"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, parseISO } from "date-fns";

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface CashFlowChartProps {
  transactions: Transaction[];
}

interface ChartDataPoint {
  date: string;
  formattedDate: string;
  income: number;
  expenses: number;
  netBalance: number;
}

export function CashFlowChart({ transactions }: CashFlowChartProps) {
  // Process transactions into daily data points
  const chartData = useMemo(() => {
    // Group transactions by date
    const dailyData = new Map<string, { income: number; expenses: number }>();

    transactions.forEach((transaction) => {
      const date = transaction.date;
      const existing = dailyData.get(date) || { income: 0, expenses: 0 };

      if (transaction.type === "Income") {
        existing.income += transaction.amount;
      } else {
        existing.expenses += transaction.amount;
      }

      dailyData.set(date, existing);
    });

    // Convert to array and sort by date
    const sortedDates = Array.from(dailyData.keys()).sort();

    // Calculate cumulative balance
    let runningBalance = 0;
    const data: ChartDataPoint[] = sortedDates.map((date) => {
      const dayData = dailyData.get(date)!;
      runningBalance += dayData.income - dayData.expenses;

      return {
        date,
        formattedDate: format(parseISO(date), "MMM dd"),
        income: dayData.income,
        expenses: dayData.expenses,
        netBalance: runningBalance,
      };
    });

    return data;
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No transaction data available
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="formattedDate"
            tick={{ fontSize: 11, fill: "#888" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#888" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
            width={60}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as ChartDataPoint;
                return (
                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium mb-2">{data.formattedDate}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-emerald-600">
                        Income: {formatCurrency(data.income)}
                      </p>
                      <p className="text-sm text-red-600">
                        Expenses: {formatCurrency(data.expenses)}
                      </p>
                      <div className="border-t border-gray-200 dark:border-slate-700 pt-1 mt-2">
                        <p className="text-sm font-medium text-blue-600">
                          Net: {formatCurrency(data.netBalance)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="netBalance"
            name="Net Balance"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#balanceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Need to import useMemo since this is a client component
import { useMemo } from "react";
