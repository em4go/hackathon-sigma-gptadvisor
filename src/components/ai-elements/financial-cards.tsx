"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  Target,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  BarChart3,
  Landmark,
} from "lucide-react";

// ============ PORTFOLIO COMPONENTS ============

interface PortfolioData {
  summary: {
    totalInvested: number;
    currentValue: number;
    totalProfitLoss: number;
    totalProfitLossPercentage: number;
    currency: string;
  };
  assetAllocation: Array<{
    group: string;
    allocation_percentage: number;
    total_value: number;
  }>;
  positions?: Array<{
    symbol: string;
    name: string;
    group: string;
    quantity: number;
    current_price: number;
    total_value: number;
    profit_loss_percentage: number;
  }>;
  filteredPositions?: {
    group: string;
    count: number;
    totalValue: number;
  };
  historicalEvolution?: Array<{
    month: string;
    value: number;
  }>;
  message: string;
}

const COLORS = {
  Crypto: "#f59e0b",    // amber-500
  ETFs: "#10b981",      // emerald-500
  Stocks: "#3b82f6",    // blue-500
  Others: "#8b5cf6",    // violet-500
};

// Simple Donut Chart Component
const DonutChart = ({
  data,
  size = 120,
  strokeWidth = 12
}: {
  data: Array<{ group: string; allocation_percentage: number }>;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {data.map((item, index) => {
        const strokeDasharray = `${(item.allocation_percentage / 100) * circumference} ${circumference}`;
        const strokeDashoffset = -currentOffset;
        currentOffset += (item.allocation_percentage / 100) * circumference;
        
        const color = COLORS[item.group as keyof typeof COLORS] || "#6b7280";
        
        return (
          <circle
            key={item.group}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export const PortfolioCard = ({ data, className }: { data: PortfolioData; className?: string }) => {
  const { summary, assetAllocation, positions } = data;
  const isProfitable = summary.totalProfitLoss >= 0;
  
  // Get top 3 positions by value
  const topPositions = positions
    ?.sort((a, b) => b.total_value - a.total_value)
    .slice(0, 3) || [];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Portfolio Overview</CardTitle>
          </div>
          <Badge 
            variant={isProfitable ? "default" : "destructive"}
            className={cn(
              "font-medium",
              isProfitable && "bg-green-500/10 text-green-600 hover:bg-green-500/20"
            )}
          >
            {isProfitable ? (
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="mr-1 h-3.5 w-3.5" />
            )}
            {summary.totalProfitLossPercentage >= 0 ? "+" : ""}
            {summary.totalProfitLossPercentage.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Value Display */}
        <div className="text-center">
          <p className="text-3xl font-bold tracking-tight">
            ${summary.currentValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className={cn(
              "text-sm font-medium flex items-center gap-0.5",
              isProfitable ? "text-green-600" : "text-red-600"
            )}>
              {isProfitable ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              ${Math.abs(summary.totalProfitLoss).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-muted-foreground">
              ({((summary.currentValue - summary.totalInvested) / summary.totalInvested * 100).toFixed(2)}%)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Invested: ${summary.totalInvested.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Allocation Chart */}
        <div className="flex items-center gap-6">
          <DonutChart data={assetAllocation} />
          <div className="flex-1 space-y-2">
            {assetAllocation.map((item) => (
              <div key={item.group} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[item.group as keyof typeof COLORS] || "#6b7280" }}
                  />
                  <span className="text-sm">{item.group}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{item.allocation_percentage}%</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    (${item.total_value.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Positions */}
        {topPositions.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Top Positions
            </p>
            <div className="grid grid-cols-3 gap-2">
              {topPositions.map((pos) => (
                <div 
                  key={pos.symbol} 
                  className="bg-muted/50 rounded-lg p-2 text-center"
                >
                  <p className="font-semibold text-sm">{pos.symbol}</p>
                  <p className="text-xs text-muted-foreground truncate">{pos.name}</p>
                  <p className={cn(
                    "text-xs font-medium mt-1",
                    pos.profit_loss_percentage >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {pos.profit_loss_percentage >= 0 ? "+" : ""}
                    {pos.profit_loss_percentage.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ============ GOALS COMPONENTS ============

interface GoalsData {
  goals: Array<{
    name: string;
    description: string;
    reference_price: number;
    currency: string;
    category: string;
  }>;
  totalGoalsValue: number;
  categories: string[];
  count: number;
  message: string;
}

export const GoalsCard = ({ 
  data, 
  currentBalance = 8000, // This should come from context in real app
  monthlySavings = 1700,
  className 
}: { 
  data: GoalsData; 
  currentBalance?: number;
  monthlySavings?: number;
  className?: string 
}) => {
  const { goals, totalGoalsValue } = data;

  // Calculate affordability
  const goalsWithProgress = goals.map(goal => {
    const progress = Math.min(100, (currentBalance / goal.reference_price) * 100);
    const monthsToGoal = monthlySavings > 0 ? Math.ceil(goal.reference_price / monthlySavings) : 99;
    const isAffordable = goal.reference_price <= currentBalance * 0.5;
    
    return {
      ...goal,
      progress,
      monthsToGoal,
      isAffordable,
    };
  }).sort((a, b) => b.progress - a.progress); // Sort by progress

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Your Goals</CardTitle>
          </div>
          <Badge variant="outline" className="font-medium">
            €{totalGoalsValue.toLocaleString()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {goalsWithProgress.slice(0, 4).map((goal) => (
          <div key={goal.name} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{goal.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {goal.description}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-sm">€{goal.reference_price.toLocaleString()}</p>
                {goal.isAffordable ? (
                  <Badge variant="default" className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20">
                    Ready!
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    ~{goal.monthsToGoal} months
                  </span>
                )}
              </div>
            </div>
            <Progress 
              value={goal.progress} 
              className="h-2"
            />
          </div>
        ))}
        
        {goalsWithProgress.length > 4 && (
          <p className="text-xs text-center text-muted-foreground">
            +{goalsWithProgress.length - 4} more goals
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// ============ SPENDING ANALYSIS COMPONENTS ============

interface SpendingData {
  period: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  biggestExpense: {
    name: string;
    amount: number;
    category: string;
    date: string;
  } | null;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  insights: {
    topCategory: string | null;
    topCategoryAmount: number;
    topCategoryPercentage: number;
  };
  message: string;
}

const SPENDING_COLORS = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
];

export const SpendingCard = ({ data, className }: { data: SpendingData; className?: string }) => {
  const { totalSpent, transactionCount, categoryBreakdown, biggestExpense, insights } = data;
  
  const formatPeriod = (period: string) => {
    const map: Record<string, string> = {
      current_month: "This Month",
      last_month: "Last Month",
      last_3_months: "Last 3 Months",
      last_6_months: "Last 6 Months",
      all_time: "All Time",
    };
    return map[period] || period;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Spending Analysis</CardTitle>
          </div>
          <Badge variant="outline" className="font-medium">
            {formatPeriod(data.period)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Total Summary */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-full">
              <Wallet className="h-4 w-4 text-rose-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-xl font-bold">${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Transactions</p>
            <p className="font-semibold">{transactionCount}</p>
          </div>
        </div>

        {/* Category Breakdown Bars */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            By Category
          </p>
          <div className="space-y-2">
            {categoryBreakdown.slice(0, 5).map((cat, index) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate max-w-[120px]">{cat.category}</span>
                  <span className="font-medium">${cat.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", SPENDING_COLORS[index % SPENDING_COLORS.length])}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {cat.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biggest Expense */}
        {biggestExpense && (
          <div className="pt-4 border-t">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Biggest Expense
            </p>
            <div className="flex items-center justify-between p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
              <div>
                <p className="font-medium text-sm">{biggestExpense.name}</p>
                <p className="text-xs text-muted-foreground">{biggestExpense.category}</p>
              </div>
              <p className="font-semibold text-amber-600">
                -${biggestExpense.amount.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ============ FINANCIAL ADVICE COMPONENT ============

interface FinancialAdviceData {
  financialHealth: {
    savingsRate: number;
    monthlyExpenses: number;
    portfolioValue: number;
    goalsValue: number;
  };
  recommendations: string[];
  topic: string;
  message: string;
}

export const FinancialAdviceCard = ({ data, className }: { data: FinancialAdviceData; className?: string }) => {
  const { financialHealth, recommendations } = data;
  const isGoodSavingsRate = financialHealth.savingsRate >= 20;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Financial Health Check</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Savings Rate</p>
            <p className={cn(
              "text-xl font-bold",
              isGoodSavingsRate ? "text-green-600" : "text-amber-600"
            )}>
              {financialHealth.savingsRate.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Monthly Expenses</p>
            <p className="text-xl font-bold">
              ${financialHealth.monthlyExpenses.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Personalized Recommendations
            </p>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-2 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Export types
export type { PortfolioData, GoalsData, SpendingData, FinancialAdviceData };
