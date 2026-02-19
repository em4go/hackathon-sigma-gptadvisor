"use client";

import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface ParetoChartProps {
  transactions: Transaction[];
}

interface ParetoData {
  category: string;
  amount: number;
  cumulativePercent: number;
  percentOfTotal: number;
}

export function ParetoChart({ transactions }: ParetoChartProps) {
  const data = useMemo(() => {
    // Filter only expenses
    const expenses = transactions.filter((t) => t.type === "Expense");

    if (expenses.length === 0) return [];

    // Group by category
    const categoryMap = new Map<string, number>();
    expenses.forEach((transaction) => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.amount);
    });

    // Calculate total
    const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

    // Convert to array, sort by amount descending
    const sortedCategories = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentOfTotal: (amount / total) * 100,
      }))
      .sort((a, b) => b.amount - a.amount);

    // Calculate cumulative percentage
    let cumulative = 0;
    const paretoData: ParetoData[] = sortedCategories.map((item) => {
      cumulative += item.percentOfTotal;
      return {
        ...item,
        cumulativePercent: Math.min(cumulative, 100),
      };
    });

    return paretoData;
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  // Find the 80% threshold index
  const eightyPercentIndex = useMemo(() => {
    return data.findIndex((item) => item.cumulativePercent >= 80);
  }, [data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No expense data available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 80/20 Summary */}
      <div className="flex justify-between items-start mb-4 px-1">
        <div>
          <p className="text-xs text-muted-foreground">Total Expenses</p>
          <p className="text-lg font-bold text-red-500">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">80/20 Rule</p>
          <p className="text-sm">
            <span className="font-bold text-red-500">
              {eightyPercentIndex + 1}
            </span>
            <span className="text-muted-foreground">
              {" "}of {data.length} categories
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            account for 80% of spending
          </p>
        </div>
      </div>

      {/* Pareto Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              domain={[0, 100]}
              width={40}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length >= 2) {
                  const category = payload[0].payload as ParetoData;
                  return (
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium mb-2">{category.category}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-red-500">
                          {category.percentOfTotal.toFixed(1)}% of total
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Amount: {formatCurrency(category.amount)}
                        </p>
                        <div className="border-t border-gray-200 dark:border-slate-700 pt-1 mt-2">
                          <p className="text-xs text-blue-500">
                            Cumulative: {category.cumulativePercent.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* 80% reference line */}
            <line
              x1="0%"
              y1="20%"
              x2="100%"
              y2="20%"
              stroke="#3b82f6"
              strokeDasharray="5 5"
              strokeWidth={1}
              opacity={0.5}
            />
            <Bar
              dataKey="percentOfTotal"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Line
              type="monotone"
              dataKey="cumulativePercent"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: "#3b82f6", strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-b from-red-500 to-red-600" />
          <span className="text-xs text-muted-foreground">% per Category</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500" />
          <span className="text-xs text-muted-foreground">Cumulative %</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0 border-t border-dashed border-blue-500" />
          <span className="text-xs text-muted-foreground">80% Target</span>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-xs text-red-700 dark:text-red-300">
          <span className="font-semibold">💡 Focus on:</span>{" "}
          {eightyPercentIndex <= 2 ? (
            <>
              Just <span className="font-bold">{eightyPercentIndex + 1} categories</span> are eating 
              up 80% of your budget. Cut these first for maximum impact.
            </>
          ) : eightyPercentIndex <= 4 ? (
            <>
              Your top <span className="font-bold">{eightyPercentIndex + 1} categories</span> represent 
              80% of spending. Moderately distributed - check each one.
            </>
          ) : (
            <>
              Spending is spread across many categories. 
              <span className="font-bold"> {eightyPercentIndex + 1} categories</span> needed to reach 80%. 
              Small cuts everywhere add up.
            </>
          )}
        </p>
      </div>

      {/* Top categories breakdown */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        <p className="text-xs font-medium text-muted-foreground mb-2">Priority Targets</p>
        {data.slice(0, Math.min(5, data.length)).map((item, index) => (
          <div
            key={item.category}
            className={`flex items-center justify-between text-sm p-2 rounded ${
              index <= eightyPercentIndex
                ? "bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20"
                : "bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground w-5">
                #{index + 1}
              </span>
              <span className={index <= eightyPercentIndex ? "font-medium" : ""}>
                {item.category}
              </span>
              {index <= eightyPercentIndex && (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                  80%
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">{formatCurrency(item.amount)}</span>
              <span className="text-xs text-muted-foreground w-12 text-right">
                {item.percentOfTotal.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
