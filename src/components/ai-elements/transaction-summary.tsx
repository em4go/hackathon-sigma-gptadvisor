"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  ArrowRightLeft,
  Calendar,
  Tag,
} from "lucide-react";

// Types matching the data structures from agent.ts
interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface TransactionSummaryData {
  transactions: Transaction[];
  count: number;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
  };
  message: string;
}

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Helper to format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

// Summary Card Component
interface TransactionSummaryProps {
  data: TransactionSummaryData;
  className?: string;
}

export const TransactionSummary = ({ data, className }: TransactionSummaryProps) => {
  const { summary, count } = data;
  const isPositive = summary.netBalance >= 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Financial Summary</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {count} transaction{count !== 1 ? "s" : ""} found
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Balance Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-500/10 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground font-medium">Income</span>
            </div>
            <p className="text-sm font-semibold text-green-600">
              {formatCurrency(summary.totalIncome)}
            </p>
          </div>
          
          <div className="bg-red-500/10 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-xs text-muted-foreground font-medium">Expenses</span>
            </div>
            <p className="text-sm font-semibold text-red-600">
              {formatCurrency(summary.totalExpenses)}
            </p>
          </div>
          
          <div 
            className={cn(
              "rounded-lg p-3 text-center",
              isPositive ? "bg-blue-500/10" : "bg-orange-500/10"
            )}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className={cn(
                "h-4 w-4",
                isPositive ? "text-blue-600" : "text-orange-600"
              )} />
              <span className="text-xs text-muted-foreground font-medium">Net</span>
            </div>
            <p className={cn(
              "text-sm font-semibold",
              isPositive ? "text-blue-600" : "text-orange-600"
            )}>
              {formatCurrency(summary.netBalance)}
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        {data.transactions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Recent Transactions</span>
            </div>
            
            <div className="space-y-1.5">
              {data.transactions.slice(0, 5).map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
              {data.transactions.length > 5 && (
                <p className="text-xs text-muted-foreground text-center py-1">
                  +{data.transactions.length - 5} more transactions
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Individual Transaction Row
const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
  const isIncome = transaction.type === "Income";
  
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <Badge 
          variant={isIncome ? "default" : "secondary"}
          className={cn(
            "shrink-0 text-xs",
            isIncome && "bg-green-500/10 text-green-600 hover:bg-green-500/20",
            !isIncome && "bg-red-500/10 text-red-600 hover:bg-red-500/20"
          )}
        >
          {isIncome ? "+" : "-"}
        </Badge>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{transaction.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {transaction.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>
      <span className={cn(
        "text-sm font-semibold shrink-0",
        isIncome ? "text-green-600" : "text-red-600"
      )}>
        {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
      </span>
    </div>
  );
};

// Re-export types
export type { Transaction, TransactionSummaryData };
