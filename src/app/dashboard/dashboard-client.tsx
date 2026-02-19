"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/navigation/bottom-nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Zap,
  Briefcase,
  Gift,
  Heart,
  Plane,
  Smartphone,
  Dumbbell,
  Scissors,
  HeartPulse,
  Clapperboard,
  Music,
  Monitor,
  Utensils,
  ShoppingCart,
  Filter,
} from "lucide-react";
import { useState, useMemo } from "react";
import transactionData from "@/../data/history.json";

interface DashboardClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  "Food & Dining": Utensils,
  Groceries: ShoppingCart,
  Shopping: ShoppingBag,
  Transportation: Car,
  Housing: Home,
  Utilities: Zap,
  Salary: Briefcase,
  Freelance: Briefcase,
  Investments: TrendingUp,
  Sales: Gift,
  Entertainment: Clapperboard,
  Health: HeartPulse,
  "Health & Fitness": Dumbbell,
  "Personal Care": Scissors,
  Pets: Heart,
  Travel: Plane,
  Government: Receipt,
  Transfer: ArrowUpRight,
  default: Receipt,
};

export function DashboardClient({ user }: DashboardClientProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const userName = user.name || user.email?.split("@")[0] || "User";
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  // Process real data from history.json
  const transactions = useMemo(() => {
    return (transactionData as Transaction[]).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
    return uniqueCategories.sort();
  }, [transactions]);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    
    if (typeFilter !== "all") {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }
    
    return filtered.slice(0, 10);
  }, [transactions, typeFilter, categoryFilter]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: income - expenses,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      remainingBudget: income - expenses,
    };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border-2 border-primary/20">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {userName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">{greeting},</p>
              <h2 className="text-xl font-semibold text-foreground capitalize">
                {userName}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Balance Card */}
        <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-primary" />
                <span className="text-muted-foreground font-medium">
                  Total Balance
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setShowBalance(!showBalance)}
              >n                {showBalance ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">
                {showBalance
                  ? formatCurrency(stats.totalBalance)
                  : "••••••"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center size-6 rounded-full bg-emerald-500/20">
                  <TrendingUp className="size-3.5 text-emerald-500" />
                </div>
                <span className="text-sm text-emerald-500 font-medium">
                  +12.5%
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {/* Income */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-emerald-500/20">
                  <ArrowDownRight className="size-4 text-emerald-500" />
                </div>
                <span className="text-xs font-medium text-emerald-500 uppercase tracking-wide">
                  Income
                </span>
              </div>
              <div className="text-xl font-bold text-foreground mb-1">
                {showBalance
                  ? formatCurrency(stats.monthlyIncome)
                  : "••••"}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          {/* Expenses */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-red-500/20">
                  <ArrowUpRight className="size-4 text-red-500" />
                </div>
                <span className="text-xs font-medium text-red-500 uppercase tracking-wide">
                  Expenses
                </span>
              </div>
              <div className="text-xl font-bold text-foreground mb-1">
                {showBalance
                  ? formatCurrency(stats.monthlyExpenses)
                  : "••••"}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          {/* Remaining Budget */}
          <Card className="bg-card border-border/50 col-span-2 md:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-blue-500/20">
                  <Receipt className="size-4 text-blue-500" />
                </div>
                <span className="text-xs font-medium text-blue-500 uppercase tracking-wide">
                  Remaining
                </span>
              </div>
              <div className="text-xl font-bold text-foreground mb-1">
                {showBalance
                  ? formatCurrency(stats.remainingBudget)
                  : "••••"}
              </div>
              <p className="text-xs text-muted-foreground">Available to spend</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Situation Summary */}
        <Card className="mb-6 bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Your Financial Situation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Budget Usage
                  </span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[60%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    Savings Rate
                  </p>
                  <p className="text-lg font-semibold text-emerald-500">
                    40%
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    Daily Budget
                  </p>
                  <p className="text-lg font-semibold">
                    {showBalance ? "$46" : "•••"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <div>
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Recent Transactions
              </h3>
              <Button variant="link" size="sm" className="text-primary">
                View All
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const Icon =
                categoryIcons[transaction.category] || categoryIcons.default;
              const isExpense = transaction.type === "Expense";

              // Format date
              const dateObj = new Date(transaction.date);
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);

              let dateDisplay = transaction.date;
              if (dateObj.toDateString() === today.toDateString()) {
                dateDisplay = "Today";
              } else if (dateObj.toDateString() === yesterday.toDateString()) {
                dateDisplay = "Yesterday";
              } else {
                dateDisplay = dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }

              return (
                <Card
                  key={transaction.id}
                  className="bg-card border-border/50 hover:bg-accent/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center size-10 rounded-full shrink-0 ${
                          isExpense ? "bg-red-500/10" : "bg-emerald-500/10"
                        }`}
                      >
                        <Icon
                          className={`size-5 ${
                            isExpense ? "text-red-500" : "text-emerald-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground truncate">
                            {transaction.name}
                          </h4>
                          <span
                            className={`font-semibold shrink-0 ${
                              isExpense
                                ? "text-red-500"
                                : "text-emerald-500"
                            }`}
                          >
                            {isExpense ? "-" : "+"}
                            {showBalance
                              ? formatCurrency(transaction.amount)
                              : "••••"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {transaction.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {dateDisplay}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
