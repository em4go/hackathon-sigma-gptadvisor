import { readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

// Types
interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface Investment {
  symbol: string;
  name: string;
  group: string;
  quantity: number;
  current_price: number;
  total_value: number;
  profit_loss_percentage: number;
}

interface PortfolioSummary {
  total_invested: number;
  current_value: number;
  total_profit_loss: number;
  total_profit_loss_percentage: number;
  currency: string;
}

interface AssetAllocation {
  group: string;
  total_value: number;
  allocation_percentage: number;
  performance_percentage: number;
}

interface PersonalGoal {
  name: string;
  description: string;
  reference_price: number;
  currency: string;
}

interface FinancialContext {
  summary: {
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyNet: number;
    savingsRate: number;
    currentBalance: number;
  };
  portfolio: {
    totalValue: number;
    totalInvested: number;
    profitLoss: number;
    profitLossPercentage: number;
    topPerformers: Array<{ symbol: string; name: string; pl: number }>;
    allocation: Array<{ group: string; percentage: number; value: number }>;
  };
  spending: {
    topCategories: Array<{ category: string; amount: number; percentage: number }>;
    recentTrend: "increasing" | "decreasing" | "stable";
    biggestExpense: { name: string; amount: number; category: string } | null;
  };
  goals: {
    totalGoalsValue: number;
    affordableNow: string[];
    needToSave: Array<{ name: string; amount: number; monthsAtCurrentRate: number }>;
  };
  insights: string[];
}

// Data loading
async function loadHistory(): Promise<Transaction[]> {
  const data = await readFile(join(DATA_DIR, "history.json"), "utf-8");
  return JSON.parse(data);
}

async function loadInvestments(): Promise<{ portfolio_summary: PortfolioSummary; asset_allocation: AssetAllocation[]; positions: Investment[] }> {
  const data = await readFile(join(DATA_DIR, "inversions.json"), "utf-8");
  return JSON.parse(data);
}

async function loadGoals(): Promise<{ personal_goals: Array<{ category: string; items: PersonalGoal[] }> }> {
  const data = await readFile(join(DATA_DIR, "objectives.json"), "utf-8");
  return JSON.parse(data);
}

function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

function getPreviousMonth(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().slice(0, 7);
}

export async function generateFinancialContext(): Promise<FinancialContext> {
  const [transactions, investments, goalsData] = await Promise.all([
    loadHistory(),
    loadInvestments(),
    loadGoals(),
  ]);

  const currentMonth = getCurrentMonth();
  const previousMonth = getPreviousMonth();

  // Calculate monthly stats
  const currentMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  const previousMonthTransactions = transactions.filter(t => t.date.startsWith(previousMonth));

  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyNet = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? (monthlyNet / monthlyIncome) * 100 : 0;

  // Calculate current balance (all time)
  const totalIncome = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = totalIncome - totalExpenses;

  // Calculate spending by category for current month
  const categorySpending = new Map<string, number>();
  currentMonthTransactions
    .filter(t => t.type === "Expense")
    .forEach(t => {
      const current = categorySpending.get(t.category) || 0;
      categorySpending.set(t.category, current + t.amount);
    });

  const sortedCategories = Array.from(categorySpending.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: monthlyExpenses > 0 ? (amount / monthlyExpenses) * 100 : 0,
    }));

  // Calculate trend
  const previousMonthExpenses = previousMonthTransactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  let recentTrend: "increasing" | "decreasing" | "stable" = "stable";
  if (previousMonthExpenses > 0) {
    const change = ((monthlyExpenses - previousMonthExpenses) / previousMonthExpenses) * 100;
    if (change > 10) recentTrend = "increasing";
    else if (change < -10) recentTrend = "decreasing";
  }

  // Find biggest expense
  const expenses = currentMonthTransactions.filter(t => t.type === "Expense");
  const biggestExpense = expenses.length > 0
    ? expenses.reduce((max, t) => t.amount > max.amount ? t : max)
    : null;

  // Portfolio analysis
  const topPerformers = investments.positions
    .sort((a, b) => b.profit_loss_percentage - a.profit_loss_percentage)
    .slice(0, 3)
    .map(p => ({
      symbol: p.symbol,
      name: p.name,
      pl: p.profit_loss_percentage,
    }));

  const allocation = investments.asset_allocation.map(a => ({
    group: a.group,
    percentage: a.allocation_percentage,
    value: a.total_value,
  }));

  // Goals analysis
  const allGoals = goalsData.personal_goals.flatMap(g => g.items);
  const totalGoalsValue = allGoals.reduce((sum, g) => sum + g.reference_price, 0);

  const affordableNow = allGoals
    .filter(g => g.reference_price <= currentBalance * 0.5) // Can afford if < 50% of balance
    .map(g => g.name);

  const monthlySavings = Math.max(0, monthlyNet);
  const needToSave = allGoals
    .filter(g => g.reference_price > currentBalance * 0.5)
    .map(g => ({
      name: g.name,
      amount: g.reference_price,
      monthsAtCurrentRate: monthlySavings > 0 ? Math.ceil(g.reference_price / monthlySavings) : Infinity,
    }))
    .sort((a, b) => a.monthsAtCurrentRate - b.monthsAtCurrentRate);

  // Generate insights
  const insights: string[] = [];
  
  if (savingsRate < 10) {
    insights.push(`Your savings rate is ${savingsRate.toFixed(1)}%, which is below the recommended 20%.`);
  } else if (savingsRate > 30) {
    insights.push(`Excellent! Your savings rate of ${savingsRate.toFixed(1)}% is above average.`);
  }

  if (recentTrend === "increasing") {
    insights.push("Your spending has increased compared to last month.");
  } else if (recentTrend === "decreasing") {
    insights.push("Great job! Your spending has decreased compared to last month.");
  }

  const cryptoAllocation = allocation.find(a => a.group === "Crypto");
  if (cryptoAllocation && cryptoAllocation.percentage > 30) {
    insights.push(`Your crypto allocation is ${cryptoAllocation.percentage}%, consider rebalancing for lower risk.`);
  }

  if (topPerformers[0] && topPerformers[0].pl > 30) {
    insights.push(`${topPerformers[0].name} is performing exceptionally well (+${topPerformers[0].pl}%).`);
  }

  return {
    summary: {
      monthlyIncome,
      monthlyExpenses,
      monthlyNet,
      savingsRate,
      currentBalance,
    },
    portfolio: {
      totalValue: investments.portfolio_summary.current_value,
      totalInvested: investments.portfolio_summary.total_invested,
      profitLoss: investments.portfolio_summary.total_profit_loss,
      profitLossPercentage: investments.portfolio_summary.total_profit_loss_percentage,
      topPerformers,
      allocation,
    },
    spending: {
      topCategories: sortedCategories.slice(0, 5),
      recentTrend,
      biggestExpense: biggestExpense ? {
        name: biggestExpense.name,
        amount: biggestExpense.amount,
        category: biggestExpense.category,
      } : null,
    },
    goals: {
      totalGoalsValue,
      affordableNow,
      needToSave,
    },
    insights,
  };
}

export function formatFinancialContextForPrompt(context: FinancialContext): string {
  const lines: string[] = [
    "=== YOUR CURRENT FINANCIAL SNAPSHOT ===",
    "",
    "## Monthly Overview",
    `- Income: $${context.summary.monthlyIncome.toFixed(2)}`,
    `- Expenses: $${context.summary.monthlyExpenses.toFixed(2)}`,
    `- Net: $${context.summary.monthlyNet.toFixed(2)}`,
    `- Savings Rate: ${context.summary.savingsRate.toFixed(1)}%`,
    `- Current Balance: $${context.summary.currentBalance.toFixed(2)}`,
    "",
    "## Portfolio",
    `- Total Value: $${context.portfolio.totalValue.toFixed(2)}`,
    `- Total Invested: $${context.portfolio.totalInvested.toFixed(2)}`,
    `- P&L: $${context.portfolio.profitLoss.toFixed(2)} (${context.portfolio.profitLossPercentage >= 0 ? "+" : ""}${context.portfolio.profitLossPercentage.toFixed(2)}%)`,
    "",
    "### Allocation:",
    ...context.portfolio.allocation.map(a => `  - ${a.group}: ${a.percentage}% ($${a.value.toFixed(2)})`),
    "",
    "### Top Performers:",
    ...context.portfolio.topPerformers.map(p => `  - ${p.symbol} (${p.name}): ${p.pl >= 0 ? "+" : ""}${p.pl.toFixed(1)}%`),
    "",
    "## Spending This Month",
    `- Trend: ${context.spending.recentTrend}`,
    context.spending.biggestExpense ? `- Biggest Expense: ${context.spending.biggestExpense.name} ($${context.spending.biggestExpense.amount.toFixed(2)})` : "",
    "",
    "### Top Categories:",
    ...context.spending.topCategories.map(c => `  - ${c.category}: $${c.amount.toFixed(2)} (${c.percentage.toFixed(1)}%)`),
    "",
    "## Goals Analysis",
    `- Total Goals Value: $${context.goals.totalGoalsValue.toFixed(2)}`,
    context.goals.affordableNow.length > 0 ? `- You can afford now: ${context.goals.affordableNow.join(", ")}` : "",
    context.goals.needToSave.length > 0 ? "- Savings needed for:" : "",
    ...context.goals.needToSave.slice(0, 3).map(g => `  - ${g.name}: $${g.amount.toFixed(2)} (${g.monthsAtCurrentRate === Infinity ? "undefined months" : `~${g.monthsAtCurrentRate} months`} at current rate)`),
    "",
    "## Key Insights",
    ...context.insights.map(i => `- ${i}`),
    "",
    "=== END SNAPSHOT ===",
  ];

  return lines.filter(Boolean).join("\n");
}

// Cache for context
let contextCache: { context: FinancialContext; timestamp: number } | null = null;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function getCachedFinancialContext(): Promise<FinancialContext> {
  const now = Date.now();
  
  if (contextCache && (now - contextCache.timestamp) < CACHE_DURATION_MS) {
    return contextCache.context;
  }

  const context = await generateFinancialContext();
  contextCache = { context, timestamp: now };
  return context;
}
