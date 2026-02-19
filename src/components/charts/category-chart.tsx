"use client";

import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface CategoryChartProps {
  transactions: Transaction[];
}

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// Color palette for categories - carefully chosen for accessibility
const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#f97316", // orange-500
  Groceries: "#22c55e", // green-500
  Shopping: "#ec4899", // pink-500
  Transportation: "#3b82f6", // blue-500
  Housing: "#8b5cf6", // violet-500
  Utilities: "#eab308", // yellow-500
  Salary: "#10b981", // emerald-500
  Freelance: "#06b6d4", // cyan-500
  Investments: "#14b8a6", // teal-500
  Entertainment: "#f43f5e", // rose-500
  Health: "#ef4444", // red-500
  "Health & Fitness": "#84cc16", // lime-500
  "Personal Care": "#a855f7", // purple-500
  Pets: "#f97316", // orange-500
  Travel: "#0ea5e9", // sky-500
  Government: "#64748b", // slate-500
  Transfer: "#94a3b8", // slate-400
};

const DEFAULT_COLORS = [
  "#f97316",
  "#22c55e",
  "#ec4899",
  "#3b82f6",
  "#8b5cf6",
  "#eab308",
  "#ef4444",
  "#06b6d4",
  "#14b8a6",
  "#f43f5e",
];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const data = useMemo(() => {
    // Filter only expenses
    const expenses = transactions.filter((t) => t.type === "Expense");

    // Group by category
    const categoryMap = new Map<string, number>();
    expenses.forEach((transaction) => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.amount);
    });

    // Calculate total
    const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

    // Convert to array and sort by value (descending)
    const sortedCategories = Array.from(categoryMap.entries())
      .map(([name, value], index) => ({
        name,
        value,
        percentage: total > 0 ? (value / total) * 100 : 0,
        color: CATEGORY_COLORS[name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value);

    // Limit to top 6 and group others
    if (sortedCategories.length > 6) {
      const topCategories = sortedCategories.slice(0, 5);
      const others = sortedCategories.slice(5);
      const othersValue = others.reduce((sum, cat) => sum + cat.value, 0);
      const othersPercentage = others.reduce((sum, cat) => sum + cat.percentage, 0);

      return [
        ...topCategories,
        {
          name: "Others",
          value: othersValue,
          percentage: othersPercentage,
          color: "#94a3b8", // slate-400
        },
      ];
    }

    return sortedCategories;
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return data.reduce((sum, cat) => sum + cat.value, 0);
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
      {/* Total in center */}
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Total Expenses</p>
        <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as CategoryData;
                  return (
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-medium mb-1">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(data.value)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {data.percentage.toFixed(1)}% of total
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={60}
              iconType="circle"
              formatter={(value: string, entry: any) => {
                const item = data.find((d) => d.name === value);
                return (
                  <span className="text-xs">
                    {value} ({item?.percentage.toFixed(0)}%)
                  </span>
                );
              }}
              wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category list below chart */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        {data.map((category) => (
          <div key={category.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-muted-foreground">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{formatCurrency(category.value)}</span>
              <span className="text-xs text-muted-foreground w-10 text-right">
                {category.percentage.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
