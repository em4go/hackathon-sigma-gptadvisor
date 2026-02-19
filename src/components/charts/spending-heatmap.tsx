"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface SpendingHeatmapProps {
  transactions: Transaction[];
}

interface HeatmapData {
  day: string;
  week: number;
  value: number;
  transactions: number;
  date: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKS = [1, 2, 3, 4, 5];

// Color scale from light to intense red
const getColorIntensity = (value: number, maxValue: number): string => {
  if (value === 0) return "#f1f5f9"; // slate-100
  
  const intensity = value / maxValue;
  
  if (intensity <= 0.2) return "#fecaca"; // red-200
  if (intensity <= 0.4) return "#fca5a5"; // red-300
  if (intensity <= 0.6) return "#f87171"; // red-400
  if (intensity <= 0.8) return "#ef4444"; // red-500
  return "#dc2626"; // red-600
};

export function SpendingHeatmap({ transactions }: SpendingHeatmapProps) {
  const { data, maxValue, stats } = useMemo(() => {
    // Filter only expenses
    const expenses = transactions.filter((t) => t.type === "Expense");

    // Group by day of week and week of month
    const heatmapMap = new Map<string, { value: number; count: number; date: string }>();

    expenses.forEach((transaction) => {
      const date = new Date(transaction.date);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday...
      // Adjust so Monday is 0, Sunday is 6
      const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      
      // Calculate week of month (approximate)
      const dayOfMonth = date.getDate();
      const weekOfMonth = Math.ceil(dayOfMonth / 7);
      
      const key = `${adjustedDay}-${weekOfMonth}`;
      const existing = heatmapMap.get(key) || { value: 0, count: 0, date: transaction.date };
      
      existing.value += transaction.amount;
      existing.count += 1;
      heatmapMap.set(key, existing);
    });

    // Build data array
    const data: HeatmapData[] = [];
    let maxValue = 0;

    WEEKS.forEach((week) => {
      DAYS.forEach((day, dayIndex) => {
        const key = `${dayIndex}-${week}`;
        const cellData = heatmapMap.get(key);
        
        const value = cellData?.value || 0;
        maxValue = Math.max(maxValue, value);
        
        data.push({
          day,
          week,
          value,
          transactions: cellData?.count || 0,
          date: cellData?.date || "",
        });
      });
    });

    // Calculate stats
    const dailyTotals = DAYS.map((day, index) => {
      const dayData = data.filter((d) => d.day === day);
      const total = dayData.reduce((sum, d) => sum + d.value, 0);
      return { day, total, index };
    });

    const highestDay = dailyTotals.reduce((max, d) => d.total > max.total ? d : max, dailyTotals[0]);
    const averageDaily = expenses.reduce((sum, t) => sum + t.amount, 0) / (expenses.length > 0 ? 7 : 1);

    return {
      data,
      maxValue,
      stats: {
        highestDay,
        averageDaily,
        totalExpenses: expenses.reduce((sum, t) => sum + t.amount, 0),
      },
    };
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (data.length === 0 || data.every((d) => d.value === 0)) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No spending data available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Stats summary */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div>
          <p className="text-xs text-muted-foreground">Highest Spending Day</p>
          <p className="text-sm font-semibold text-red-500">
            {stats.highestDay?.day || "-"} ({formatCurrency(stats.highestDay?.total || 0)})
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Daily Average</p>
          <p className="text-sm font-semibold">{formatCurrency(stats.averageDaily)}</p>
        </div>
      </div>

      {/* Custom Heatmap Grid */}
      <div className="relative">
        {/* Y-axis labels (Weeks) */}
        <div className="flex">
          <div className="flex flex-col justify-around pr-2 text-xs text-muted-foreground w-12">
            {WEEKS.map((week) => (
              <div key={week} className="h-10 flex items-center justify-end">
                Week {week}
              </div>
            ))}
          </div>
          
          {/* Grid */}
          <div className="flex-1">
            {/* X-axis labels */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Heatmap cells */}
            <div className="space-y-1">
              {WEEKS.map((week) => (
                <div key={week} className="grid grid-cols-7 gap-1">
                  {DAYS.map((day) => {
                    const cellData = data.find((d) => d.day === day && d.week === week);
                    const value = cellData?.value || 0;
                    const color = getColorIntensity(value, maxValue);
                    
                    return (
                      <Tooltip
                        key={`${day}-${week}`}
                        content={
                          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-medium mb-1">
                              {day} - Week {week}
                            </p>
                            <p className="text-lg font-bold text-red-500">
                              {formatCurrency(value)}
                            </p>
                            {cellData && cellData.transactions > 0 && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {cellData.transactions} transaction{cellData.transactions !== 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                        }
                      >
                        <div
                          className="h-10 rounded-md cursor-pointer transition-all hover:scale-110 hover:shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-xs text-muted-foreground">Less</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f1f5f9" }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#fecaca" }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#fca5a5" }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f87171" }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ef4444" }} />
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#dc2626" }} />
        </div>
        <span className="text-xs text-muted-foreground">More</span>
      </div>

      {/* Insights */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Insight:</span>{" "}
          {stats.highestDay?.total > stats.averageDaily * 1.5 ? (
            <>
              You tend to spend significantly more on <span className="font-semibold text-red-500">{stats.highestDay?.day}s</span>. 
              Consider reviewing your {stats.highestDay?.day.toLowerCase()} habits.
            </>
          ) : (
            <>
              Your spending is fairly distributed across the week. 
              Keep up the consistent budgeting!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// Simple Tooltip component since recharts Tooltip doesn't work well with custom grids
function Tooltip({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
