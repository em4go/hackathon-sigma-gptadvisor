"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Input } from "@/components/ui/input";
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
  Search,
  CalendarIcon,
  X,
  Loader2,
} from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { TransactionManager } from "@/components/transactions/transaction-manager";
import portfolioData from "@/../data/inversions.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashFlowChart } from "@/components/charts/cash-flow-chart";
import { CategoryChart } from "@/components/charts/category-chart";
import { ParetoChart } from "@/components/charts/pareto-chart";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const userName = user.name || user.email?.split("@")[0] || "User";
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  // Fetch transactions from API
  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(
        data.sort((a: Transaction, b: Transaction) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(transactions.map((t) => t.category))];
    return uniqueCategories.sort();
  }, [transactions]);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    
    // Filter by search query (name or category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }
    
    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }
    
    // Filter by date range
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((t) => {
        const transactionDate = parseISO(t.date);
        return isWithinInterval(transactionDate, {
          start: startOfDay(dateRange.from!),
          end: endOfDay(dateRange.to!),
        });
      });
    }
    
    return filtered.slice(0, 10);
  }, [transactions, typeFilter, categoryFilter, searchQuery, dateRange]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = income - expenses;
    const portfolioValue = (portfolioData as any).portfolio_summary?.current_value || 0;
    const netWorth = totalBalance + portfolioValue;

    return {
      totalBalance,
      netWorth,
      portfolioValue,
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
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Vibrant background for glass effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 pointer-events-none" />
      
      {/* Decorative blurred circles behind the card */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-blue-500/60 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-32 right-10 w-72 h-72 bg-purple-500/60 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-48 left-1/3 w-48 h-48 bg-pink-500/60 rounded-full blur-3xl pointer-events-none" />
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
          <TransactionManager
            transactions={transactions}
            onTransactionsChange={fetchTransactions}
          />
        </div>

        {/* Total Balance Card - Glass UI Effect */}
        <Card
          className="mb-6 relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl"
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                <span className="text-muted-foreground font-medium">
                  Net Worth
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-2 text-muted-foreground"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                <span className="text-xs">{showBalance ? "Hide" : "Show"}</span>
              </Button>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">
                {showBalance
                  ? formatCurrency(stats.netWorth)
                  : "••••••"}
              </span>
            </div>

            {/* Total Balance */}
            <div className="flex items-center justify-between py-3 border-t border-primary/20">
              <div className="flex items-center gap-2">
                <Wallet className="size-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  Total Balance
                </span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                {showBalance
                  ? formatCurrency(stats.totalBalance)
                  : "••••••"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {/* Income */}
          <Card className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
            <CardContent className="p-4 relative z-10">
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
          <Card className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
            <CardContent className="p-4 relative z-10">
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
          <Card className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl col-span-2 md:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
            <CardContent className="p-4 relative z-10">
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
        <Card className="mb-6 relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-base font-semibold">
              Your Financial Situation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 relative z-10">
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

        {/* Analytics Tabs */}
        <Card className="mb-6 relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-base font-semibold">
              Financial Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 relative z-10">
            <Tabs defaultValue="cashflow" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-white/20 backdrop-blur-sm">
                <TabsTrigger value="cashflow" className="text-xs sm:text-sm">Cash Flow</TabsTrigger>
                <TabsTrigger value="categories" className="text-xs sm:text-sm">Categories</TabsTrigger>
                <TabsTrigger value="trends" className="text-xs sm:text-sm">Trends</TabsTrigger>
              </TabsList>
              <TabsContent value="cashflow" className="mt-0">
                <CashFlowChart transactions={transactions} />
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Track your income, expenses, and net balance over time
                </p>
              </TabsContent>
              <TabsContent value="categories" className="mt-0">
                <CategoryChart transactions={transactions} />
              </TabsContent>
              <TabsContent value="trends" className="mt-0">
                <ParetoChart transactions={transactions} />
              </TabsContent>
            </Tabs>
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
            <div className="flex flex-col gap-2">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              
              {/* Type, Category and Date Filters */}
              <div className="flex flex-wrap gap-2">
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

                {/* Date Range Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-9 justify-start text-left font-normal",
                        !dateRange.from && !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd")
                        )
                      ) : (
                        <span>Pick dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        });
                      }}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>

                {/* Clear Date Filter */}
                {dateRange.from && dateRange.to && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-2"
                    onClick={() => setDateRange({ from: undefined, to: undefined })}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear date filter</span>
                  </Button>
                )}
              </div>
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
                  className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
                  <CardContent className="p-4 relative z-10">
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
