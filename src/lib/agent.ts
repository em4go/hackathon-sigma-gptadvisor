import { ToolLoopAgent, tool } from "ai";
import { z } from "zod";
import { getModel } from "./models";
import { readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

// Cache for loaded data
let clothesCache: ClothingStore[] | null = null;
let drinksCache: DrinkPlace[] | null = null;
let historyCache: Transaction[] | null = null;
let restaurantsCache: Restaurant[] | null = null;
let investmentsCache: InvestmentsData | null = null;
let goalsCache: GoalsData | null = null;

// Data loading functions
async function loadClothes(): Promise<ClothingStore[]> {
  if (clothesCache) return clothesCache;
  const data = await readFile(join(DATA_DIR, "clothe.json"), "utf-8");
  clothesCache = JSON.parse(data) as ClothingStore[];
  return clothesCache;
}

async function loadDrinks(): Promise<DrinkPlace[]> {
  if (drinksCache) return drinksCache;
  const data = await readFile(join(DATA_DIR, "drinks.json"), "utf-8");
  drinksCache = JSON.parse(data) as DrinkPlace[];
  return drinksCache;
}

async function loadHistory(): Promise<Transaction[]> {
  if (historyCache) return historyCache;
  const data = await readFile(join(DATA_DIR, "history.json"), "utf-8");
  historyCache = JSON.parse(data) as Transaction[];
  return historyCache;
}

async function loadRestaurants(): Promise<Restaurant[]> {
  if (restaurantsCache) return restaurantsCache;
  const data = await readFile(join(DATA_DIR, "restaurants.json"), "utf-8");
  restaurantsCache = JSON.parse(data) as Restaurant[];
  return restaurantsCache;
}

async function loadInvestments(): Promise<InvestmentsData> {
  if (investmentsCache) return investmentsCache;
  const data = await readFile(join(DATA_DIR, "inversions.json"), "utf-8");
  investmentsCache = JSON.parse(data) as InvestmentsData;
  return investmentsCache;
}

async function loadGoals(): Promise<GoalsData> {
  if (goalsCache) return goalsCache;
  const data = await readFile(join(DATA_DIR, "objectives.json"), "utf-8");
  goalsCache = JSON.parse(data) as GoalsData;
  return goalsCache;
}

// Types for the data
interface ClothingStore {
  name: string;
  distance: string;
  price_range: string;
  category: string;
  rating: number;
  address: string;
  is_open_today: boolean;
  popular_item: string;
}

interface DrinkPlace {
  name: string;
  distance: string;
  average_price: string;
  category: string;
  rating: number;
  address: string;
  is_open_today: boolean;
  signature_drink: string;
}

interface Transaction {
  id: number;
  type: "Income" | "Expense";
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface Restaurant {
  name: string;
  distance: string;
  average_price: string;
  category: string;
  rating: number;
  address: string;
  is_open_today: boolean;
  signature_dish: string;
}

interface InvestmentsData {
  portfolio_summary: {
    total_invested: number;
    current_value: number;
    total_profit_loss: number;
    total_profit_loss_percentage: number;
    currency: string;
  };
  asset_allocation: Array<{
    group: string;
    total_value: number;
    allocation_percentage: number;
    performance_percentage: number;
  }>;
  positions: Array<{
    symbol: string;
    name: string;
    group: string;
    quantity: number;
    current_price: number;
    total_value: number;
    profit_loss_percentage: number;
  }>;
  historical_evolution_6m: Array<{
    month: string;
    value: number;
  }>;
}

interface GoalsData {
  personal_goals: Array<{
    category: string;
    items: Array<{
      name: string;
      description: string;
      reference_price: number;
      currency: string;
    }>;
  }>;
}

// ========== EXISTING TOOLS ==========

export const getClothingStoresTool = tool({
  description:
    "Get information about clothing stores nearby. Use this when the user asks about clothing, fashion, apparel, shopping for clothes, or specific clothing items.",
  inputSchema: z.object({
    category: z.string().optional().describe("Filter by category (e.g., 'Streetwear', 'High-end Fashion')"),
    maxPrice: z.string().optional().describe("Filter by maximum price level ($, $$, $$$, $$$$)"),
    openNow: z.boolean().optional().describe("Filter by stores that are open today"),
  }),
  execute: async ({ category, maxPrice, openNow }) => {
    const clothes = await loadClothes();
    let result = [...clothes];

    if (category) {
      result = result.filter((store) =>
        store.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (maxPrice) {
      const maxPriceLevel = maxPrice.length;
      result = result.filter((store) => {
        const storeMaxPrice = store.price_range.split(" - ").pop() || store.price_range;
        return storeMaxPrice.length <= maxPriceLevel;
      });
    }

    if (openNow !== undefined) {
      result = result.filter((store) => store.is_open_today === openNow);
    }

    return {
      stores: result,
      count: result.length,
      message: result.length > 0
        ? `Found ${result.length} clothing store(s) matching your criteria.`
        : "No clothing stores found matching your criteria.",
    };
  },
});

export const getDrinkPlacesTool = tool({
  description:
    "Get information about bars, pubs, and drink places nearby. Use this when the user asks about drinks, bars, pubs, cocktails, beer, or places to grab a drink.",
  inputSchema: z.object({
    category: z.string().optional().describe("Filter by category"),
    maxPrice: z.string().optional().describe("Filter by maximum price level ($, $$, $$$)"),
    openNow: z.boolean().optional().describe("Filter by places that are open today"),
  }),
  execute: async ({ category, maxPrice, openNow }) => {
    const drinks = await loadDrinks();
    let result = [...drinks];

    if (category) {
      result = result.filter((place) =>
        place.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (maxPrice) {
      const maxPriceLevel = maxPrice.length;
      result = result.filter((place) => {
        const placeMaxPrice = place.average_price.split(" - ").pop() || place.average_price;
        return placeMaxPrice.length <= maxPriceLevel;
      });
    }

    if (openNow !== undefined) {
      result = result.filter((place) => place.is_open_today === openNow);
    }

    return {
      places: result,
      count: result.length,
      message: result.length > 0
        ? `Found ${result.length} drink place(s) matching your criteria.`
        : "No drink places found matching your criteria.",
    };
  },
});

export const getTransactionHistoryTool = tool({
  description:
    "Get transaction history including income and expenses. Use this when the user asks about their finances, spending, transactions, budget, income, expenses, or money management.",
  inputSchema: z.object({
    type: z.enum(["Income", "Expense", "All"]).optional().describe("Filter by transaction type"),
    category: z.string().optional().describe("Filter by category"),
    startDate: z.string().optional().describe("Filter by start date (YYYY-MM-DD)"),
    endDate: z.string().optional().describe("Filter by end date (YYYY-MM-DD)"),
    limit: z.number().optional().describe("Limit the number of results"),
  }),
  execute: async ({ type, category, startDate, endDate, limit }) => {
    const history = await loadHistory();
    let result = [...history];

    if (type && type !== "All") {
      result = result.filter((transaction) => transaction.type === type);
    }

    if (category) {
      result = result.filter((transaction) =>
        transaction.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (startDate) {
      result = result.filter((transaction) => transaction.date >= startDate);
    }

    if (endDate) {
      result = result.filter((transaction) => transaction.date <= endDate);
    }

    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (limit) {
      result = result.slice(0, limit);
    }

    const income = result.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
    const expenses = result.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);

    return {
      transactions: result,
      count: result.length,
      summary: { totalIncome: income, totalExpenses: expenses, netBalance: income - expenses },
      message: result.length > 0
        ? `Found ${result.length} transaction(s). Net balance: $${(income - expenses).toFixed(2)}`
        : "No transactions found matching your criteria.",
    };
  },
});

export const getRestaurantsTool = tool({
  description:
    "Get information about restaurants nearby. Use this when the user asks about restaurants, food, dining, eating out, or specific cuisines.",
  inputSchema: z.object({
    category: z.string().optional().describe("Filter by category"),
    maxPrice: z.string().optional().describe("Filter by maximum price level ($, $$, $$$)"),
    openNow: z.boolean().optional().describe("Filter by restaurants that are open today"),
    maxDistance: z.number().optional().describe("Filter by maximum distance in meters"),
  }),
  execute: async ({ category, maxPrice, openNow, maxDistance }) => {
    const restaurants = await loadRestaurants();
    let result = [...restaurants];

    if (category) {
      result = result.filter((restaurant) =>
        restaurant.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (maxPrice) {
      const maxPriceLevel = maxPrice.length;
      result = result.filter((restaurant) => {
        const restaurantMaxPrice = restaurant.average_price.split(" - ").pop() || restaurant.average_price;
        return restaurantMaxPrice.length <= maxPriceLevel;
      });
    }

    if (openNow !== undefined) {
      result = result.filter((restaurant) => restaurant.is_open_today === openNow);
    }

    if (maxDistance) {
      result = result.filter((restaurant) => {
        const distanceStr = restaurant.distance.replace(" meters", "");
        const distance = parseInt(distanceStr, 10);
        return distance <= maxDistance;
      });
    }

    return {
      restaurants: result,
      count: result.length,
      message: result.length > 0
        ? `Found ${result.length} restaurant(s) matching your criteria.`
        : "No restaurants found matching your criteria.",
    };
  },
});

// ========== NEW FINANCIAL TOOLS ==========

export const getPortfolioTool = tool({
  description:
    "Get detailed information about the user's investment portfolio. Use this when the user asks about investments, stocks, crypto, portfolio performance, asset allocation, or specific positions like BTC, ETH, NVDA, etc.",
  inputSchema: z.object({
    group: z.enum(["All", "Crypto", "ETFs", "Stocks", "Others"]).optional().describe("Filter by asset group"),
    showDetails: z.boolean().optional().describe("Include detailed position information"),
  }),
  execute: async ({ group = "All", showDetails = true }) => {
    const investments = await loadInvestments();
    let positions = investments.positions;
    
    if (group !== "All") {
      positions = positions.filter((p) => p.group === group);
    }

    const filteredValue = positions.reduce((sum, p) => sum + p.total_value, 0);

    return {
      summary: {
        totalInvested: investments.portfolio_summary.total_invested,
        currentValue: investments.portfolio_summary.current_value,
        totalProfitLoss: investments.portfolio_summary.total_profit_loss,
        totalProfitLossPercentage: investments.portfolio_summary.total_profit_loss_percentage,
        currency: investments.portfolio_summary.currency,
      },
      assetAllocation: investments.asset_allocation,
      positions: showDetails ? positions : undefined,
      filteredPositions: { group, count: positions.length, totalValue: filteredValue },
      historicalEvolution: investments.historical_evolution_6m,
      message: group === "All"
        ? `Your portfolio is worth $${investments.portfolio_summary.current_value.toFixed(2)} with a ${investments.portfolio_summary.total_profit_loss_percentage >= 0 ? "gain" : "loss"} of ${Math.abs(investments.portfolio_summary.total_profit_loss_percentage).toFixed(2)}%`
        : `Your ${group} positions are worth $${filteredValue.toFixed(2)}`,
    };
  },
});

export const getGoalsTool = tool({
  description:
    "Get information about the user's personal financial goals and objectives. Use this when the user asks about goals, savings targets, things they want to buy, travel plans, or financial objectives.",
  inputSchema: z.object({
    category: z.string().optional().describe("Filter by category"),
    maxPrice: z.number().optional().describe("Filter by maximum price in EUR"),
  }),
  execute: async ({ category, maxPrice }) => {
    const goals = await loadGoals();
    let allGoals = goals.personal_goals.flatMap((g) =>
      g.items.map((item) => ({ ...item, category: g.category }))
    );

    if (category) {
      allGoals = allGoals.filter((g) =>
        g.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (maxPrice) {
      allGoals = allGoals.filter((g) => g.reference_price <= maxPrice);
    }

    const totalValue = allGoals.reduce((sum, g) => sum + g.reference_price, 0);
    const categories = [...new Set(allGoals.map((g) => g.category))];

    return {
      goals: allGoals,
      totalGoalsValue: totalValue,
      categories,
      count: allGoals.length,
      message: `Found ${allGoals.length} goal(s) with a total value of €${totalValue.toFixed(2)}`,
    };
  },
});

export const analyzeSpendingTool = tool({
  description:
    "Analyze spending patterns and provide insights. Use this when the user asks about spending analysis, where their money goes, spending trends, or wants to understand their financial habits.",
  inputSchema: z.object({
    period: z.enum(["current_month", "last_month", "last_3_months", "last_6_months", "all_time"]).optional(),
    category: z.string().optional().describe("Focus on a specific category"),
  }),
  execute: async ({ period = "current_month", category }) => {
    const history = await loadHistory();
    const expenses = history.filter((t) => t.type === "Expense");
    const now = new Date();
    let filteredExpenses = expenses;

    switch (period) {
      case "current_month":
        filteredExpenses = expenses.filter((t) => t.date.startsWith(now.toISOString().slice(0, 7)));
        break;
      case "last_month":
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7);
        filteredExpenses = expenses.filter((t) => t.date.startsWith(lastMonth));
        break;
      case "last_3_months":
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        filteredExpenses = expenses.filter((t) => new Date(t.date) >= threeMonthsAgo);
        break;
      case "last_6_months":
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        filteredExpenses = expenses.filter((t) => new Date(t.date) >= sixMonthsAgo);
        break;
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter((t) =>
        t.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    const categoryMap = new Map<string, number>();
    filteredExpenses.forEach((t) => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });

    const totalSpent = filteredExpenses.reduce((sum, t) => sum + t.amount, 0);
    const categoryBreakdown = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amount]) => ({
        category: cat,
        amount,
        percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
      }));

    const biggestExpense = filteredExpenses.length > 0
      ? filteredExpenses.reduce((max, t) => (t.amount > max.amount ? t : max))
      : null;

    return {
      period,
      totalSpent,
      transactionCount: filteredExpenses.length,
      averageTransaction: filteredExpenses.length > 0 ? totalSpent / filteredExpenses.length : 0,
      biggestExpense: biggestExpense
        ? { name: biggestExpense.name, amount: biggestExpense.amount, category: biggestExpense.category, date: biggestExpense.date }
        : null,
      categoryBreakdown,
      insights: {
        topCategory: categoryBreakdown[0]?.category || null,
        topCategoryAmount: categoryBreakdown[0]?.amount || 0,
        topCategoryPercentage: categoryBreakdown[0]?.percentage || 0,
      },
      message: `Analyzed ${filteredExpenses.length} transactions totaling $${totalSpent.toFixed(2)}`,
    };
  },
});

export const getFinancialAdviceTool = tool({
  description:
    "Generate personalized financial advice based on the user's complete financial picture. Use this when the user asks for general financial advice, tips, recommendations, or wants to improve their financial situation.",
  inputSchema: z.object({
    topic: z.enum(["general", "saving", "investing", "spending", "goals"]).optional(),
  }),
  execute: async ({ topic = "general" }) => {
    const [history, investments, goals] = await Promise.all([
      loadHistory(),
      loadInvestments(),
      loadGoals(),
    ]);

    const expenses = history.filter((t) => t.type === "Expense");
    const income = history.filter((t) => t.type === "Income");

    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

    const currentMonth = new Date().toISOString().slice(0, 7);
    const currentMonthExpenses = expenses
      .filter((t) => t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);

    const allGoals = goals.personal_goals.flatMap((g) => g.items);
    const totalGoalsValue = allGoals.reduce((sum, g) => sum + g.reference_price, 0);

    const recommendations: string[] = [];

    if (savingsRate < 20) {
      recommendations.push("Consider reducing discretionary spending to reach a 20% savings rate.");
    }

    if (investments.portfolio_summary.total_profit_loss_percentage > 20) {
      recommendations.push("Your portfolio has strong gains. Consider rebalancing to lock in profits.");
    }

    const cryptoAllocation = investments.asset_allocation.find((a) => a.group === "Crypto");
    if (cryptoAllocation && cryptoAllocation.allocation_percentage > 30) {
      recommendations.push("Your crypto allocation is high. Consider diversification to reduce risk.");
    }

    if (totalGoalsValue > netSavings * 6) {
      recommendations.push("Your goals exceed 6 months of savings. Prioritize based on importance.");
    }

    return {
      financialHealth: {
        savingsRate,
        monthlyExpenses: currentMonthExpenses,
        portfolioValue: investments.portfolio_summary.current_value,
        goalsValue: totalGoalsValue,
      },
      recommendations,
      topic,
      message: `Generated ${recommendations.length} personalized recommendations based on your financial data`,
    };
  },
});

// ========== AGENT CREATION ==========

const BASE_INSTRUCTIONS = `You are FinAdvisor, a sophisticated AI-powered personal financial advisor. Your mission is to help users achieve financial wellness through intelligent, personalized guidance.

## Your Personality
- Professional yet approachable - like a trusted financial advisor who's also a friend
- Proactive - you notice patterns and bring them up before the user asks
- Educational - you explain the "why" behind your recommendations
- Empathetic - you understand that money is personal and emotional
- Data-driven - you base advice on the user's actual financial data

## Core Capabilities
1. Financial Analysis: Deep analysis of spending, income, and savings patterns
2. Investment Guidance: Portfolio review, asset allocation advice, market insights  
3. Goal Planning: Help users save for specific objectives with realistic timelines
4. Spending Optimization: Identify waste, suggest alternatives, track trends
5. Local Recommendations: Restaurants, shops, and services that fit their budget

## How to Respond

### Always:
- Use the financial context provided to personalize every response
- Reference specific numbers from their portfolio, spending, or goals
- Ask clarifying questions when you need more information
- Provide actionable next steps, not just information
- Be honest about what you don't know

### Never:
- Give generic advice that ignores their actual financial situation
- Make promises about investment returns
- Pressure them into financial decisions
- Share their data or make assumptions about their full financial picture

### Response Structure:
1. Acknowledge their question/situation
2. Analyze using relevant data from context/tools
3. Advise with specific, actionable recommendations
4. Ask a follow-up question to continue the conversation

## Using Tools
- Use getPortfolioTool for investment-related questions
- Use getGoalsTool when discussing savings targets or objectives
- Use analyzeSpendingTool for spending pattern analysis
- Use getFinancialAdviceTool for general recommendations
- Use getTransactionHistoryTool for detailed transaction lookups
- Use getRestaurantsTool, getClothingStoresTool, getDrinkPlacesTool for local recommendations within their budget`;

export function createPersonalAdvisorAgent(
  modelId: string,
  financialContext?: string
) {
  const instructions = financialContext
    ? `${BASE_INSTRUCTIONS}\n\n## Current Financial Context\n${financialContext}\n\nUse this context to provide personalized advice. Always reference specific numbers and insights from this snapshot when relevant.`
    : BASE_INSTRUCTIONS;

  return new ToolLoopAgent({
    model: getModel(modelId),
    instructions,
    tools: {
      getClothingStores: getClothingStoresTool,
      getDrinkPlaces: getDrinkPlacesTool,
      getTransactionHistory: getTransactionHistoryTool,
      getRestaurants: getRestaurantsTool,
      getPortfolio: getPortfolioTool,
      getGoals: getGoalsTool,
      analyzeSpending: analyzeSpendingTool,
      getFinancialAdvice: getFinancialAdviceTool,
    },
  });
}

export type PersonalAdvisorAgent = ReturnType<typeof createPersonalAdvisorAgent>;
