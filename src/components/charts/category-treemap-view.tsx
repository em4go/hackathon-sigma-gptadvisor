"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Treemap,
} from "recharts";

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface CategoryTreemapViewProps {
  transactions: Transaction[];
}

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface TreemapData {
  name: string;
  size: number;
  category: string;
  date: string;
  color: string;
}

// Harmonious color palette matching the glass UI theme
// Using the same color family as the background gradients (blue/purple/pink)
const CATEGORY_PALETTE = [
  "#3b82f6", // Blue - primary accent
  "#8b5cf6", // Violet
  "#a855f7", // Purple
  "#d946ef", // Fuchsia
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#f97316", // Orange
  "#eab308", // Yellow
  "#84cc16", // Lime
  "#22c55e", // Green
  "#14b8a6", // Teal
  "#06b6d4", // Cyan
  "#6366f1", // Indigo
  "#0ea5e9", // Sky
  "#10b981", // Emerald
  "#f472b6", // Light pink
];

// Map categories to consistent colors
const getCategoryColor = (category: string): string => {
  const hash = category.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return CATEGORY_PALETTE[Math.abs(hash) % CATEGORY_PALETTE.length];
};

export function CategoryTreemapView({ transactions }: CategoryTreemapViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Category data for Pie Chart - with Others grouping (10-20% of smallest)
  const categoryData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "Expense");

    const categoryMap = new Map<string, number>();
    expenses.forEach((transaction) => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.amount);
    });

    const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

    // Sort categories by value
    const sortedCategories = Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: total > 0 ? (value / total) * 100 : 0,
        color: getCategoryColor(name),
      }))
      .sort((a, b) => b.value - a.value);

    // Group smallest 10-20% into "Others" (target ~15%)
    const targetOthersPercentage = 15;
    let cumulativePercentage = 0;
    let splitIndex = sortedCategories.length;

    // Find where to split (accumulate from smallest until we have ~15%)
    for (let i = sortedCategories.length - 1; i >= 0; i--) {
      cumulativePercentage += sortedCategories[i].percentage;
      if (cumulativePercentage >= targetOthersPercentage - 5) {
        splitIndex = i;
        break;
      }
    }

    // Only create "Others" if we have more than 3 categories and found items to group
    if (sortedCategories.length > 3 && splitIndex < sortedCategories.length) {
      const mainCategories = sortedCategories.slice(0, splitIndex);
      const othersCategories = sortedCategories.slice(splitIndex);

      const othersValue = othersCategories.reduce((sum, cat) => sum + cat.value, 0);
      const othersPercentage = othersCategories.reduce((sum, cat) => sum + cat.percentage, 0);

      return [
        ...mainCategories,
        {
          name: "Others",
          value: othersValue,
          percentage: othersPercentage,
          color: "#64748b", // Slate for others
        },
      ];
    }

    return sortedCategories;
  }, [transactions]);

  // Store mapping of which original categories are in "Others"
  const othersCategories = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "Expense");
    const categoryMap = new Map<string, number>();
    expenses.forEach((transaction) => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.amount);
    });

    const sortedCategories = Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const targetOthersPercentage = 15;
    let cumulativePercentage = 0;
    const total = sortedCategories.reduce((sum, cat) => sum + cat.value, 0);
    const othersNames: string[] = [];

    for (let i = sortedCategories.length - 1; i >= 0; i--) {
      cumulativePercentage += (sortedCategories[i].value / total) * 100;
      othersNames.push(sortedCategories[i].name);
      if (cumulativePercentage >= targetOthersPercentage - 5) {
        break;
      }
    }

    return othersNames;
  }, [transactions]);

  // All categories for legend (including those in "Others")
  const allCategoriesForLegend = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "Expense");
    const categoryMap = new Map<string, number>();
    expenses.forEach((transaction) => {
      const current = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, current + transaction.amount);
    });

    const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: total > 0 ? (value / total) * 100 : 0,
        color: getCategoryColor(name),
        isInOthers: othersCategories.includes(name),
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, othersCategories]);

  // Treemap data - individual expenses
  const treemapData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "Expense");

    return [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 50)
      .map((expense) => ({
        name: expense.name,
        size: expense.amount,
        category: expense.category,
        date: expense.date,
        color: getCategoryColor(expense.category),
      }));
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return categoryData.reduce((sum, cat) => sum + cat.value, 0);
  }, [categoryData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  if (categoryData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No expense data available
      </div>
    );
  }

  // Custom Treemap cell renderer
  interface TreemapCellProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    name?: string;
    size?: number;
    color?: string;
    category?: string;
  }

  const CustomTreemapContent = (props: TreemapCellProps) => {
    const { x = 0, y = 0, width = 0, height = 0, name, color, category } = props;
    
    // Check if this item should be highlighted based on selection
    const isHighlighted = selectedCategory === null || 
      selectedCategory === category ||
      (selectedCategory === "Others" && othersCategories.includes(category!));
    const isDimmed = selectedCategory !== null && !isHighlighted;

    if (width < 20 || height < 15) return null;

    return (
      <g style={{ transition: 'opacity 0.2s ease' }}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="white"
          strokeWidth={2}
          rx={4}
          opacity={isDimmed ? 0.2 : 1}
          style={{ transition: 'opacity 0.2s ease' }}
        />
        {width > 45 && height > 22 && !isDimmed && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="white"
            fontSize={Math.min(width / 8, height / 3, 10)}
            fontWeight={600}
            style={{ pointerEvents: 'none' }}
          >
            {name && name.length > 12 ? `${name.slice(0, 10)}...` : name}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Total header */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Total Expenses</p>
        <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
      </div>

      {/* Main layout: Pie (30%) + Treemap (70%) */}
      <div className="flex gap-4">
        {/* Pie Chart - 30% */}
        <div className="w-[30%] min-w-[140px]">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={1}
                  dataKey="value"
                  nameKey="name"
                  onClick={(_, index) => {
                    const cat = categoryData[index];
                    handleCategoryClick(cat.name);
                  }}
                  className="cursor-pointer"
                >
                  {categoryData.map((entry, index) => {
                    const isSelected = selectedCategory === entry.name;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={isSelected ? "white" : "transparent"}
                        strokeWidth={isSelected ? 2 : 0}
                        style={{
                          filter: isSelected ? 'brightness(1.15)' : 'none',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                        }}
                      />
                    );
                  })}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as CategoryData;
                      return (
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 shadow-lg">
                          <p className="text-sm font-medium mb-0.5">{data.name}</p>
                          <p className="text-sm">{formatCurrency(data.value)}</p>
                          <p className="text-xs text-muted-foreground">
                            {data.percentage.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-1">By Category</p>
        </div>

        {/* Treemap - 70% */}
        <div className="flex-1">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={selectedCategory 
                  ? selectedCategory === "Others"
                    ? treemapData.filter(d => othersCategories.includes(d.category))
                    : treemapData.filter(d => d.category === selectedCategory)
                  : treemapData
                }
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={<CustomTreemapContent />}
              >
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as TreemapData;
                      return (
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 shadow-lg">
                          <p className="text-sm font-medium mb-0.5">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <p className="text-base font-bold">{formatCurrency(item.size)}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground">Individual Expenses</p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-primary hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category legend - full width */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center pt-2 border-t border-border/50">
        {allCategoriesForLegend.map((cat) => {
          const isSelected = selectedCategory === cat.name || 
            (selectedCategory === "Others" && cat.isInOthers);
          
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.isInOthers ? "Others" : cat.name)}
              className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded transition-all ${
                isSelected 
                  ? 'font-medium bg-primary/10' 
                  : selectedCategory !== null 
                    ? 'opacity-30' 
                    : 'opacity-70 hover:opacity-100 hover:bg-muted/50'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ 
                  backgroundColor: cat.isInOthers ? "#64748b" : cat.color 
                }}
              />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
