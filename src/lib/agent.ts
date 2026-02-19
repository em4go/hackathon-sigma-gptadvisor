import { ToolLoopAgent, tool } from "ai";
import { z } from "zod";
import { getModel } from "./models";
import { readFile } from "fs/promises";
import { join } from "path";

// Data file paths
const DATA_DIR = join(process.cwd(), "data");

// Cache for loaded data
let clothesCache: ClothingStore[] | null = null;
let drinksCache: DrinkPlace[] | null = null;
let historyCache: Transaction[] | null = null;
let restaurantsCache: Restaurant[] | null = null;

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

/**
 * Tool to get clothing stores information
 */
export const getClothingStoresTool = tool({
  description:
    "Get information about clothing stores nearby. Use this when the user asks about clothing, fashion, apparel, shopping for clothes, or specific clothing items.",
  inputSchema: z.object({
    category: z
      .string()
      .optional()
      .describe("Filter by category (e.g., 'Streetwear', 'High-end Fashion', 'Vintage / Second-hand', 'Casual Wear', 'Footwear & Accessories')"),
    maxPrice: z
      .string()
      .optional()
      .describe("Filter by maximum price level ($, $$, $$$, $$$$)"),
    openNow: z
      .boolean()
      .optional()
      .describe("Filter by stores that are open today"),
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
      message:
        result.length > 0
          ? `Found ${result.length} clothing store(s) matching your criteria.`
          : "No clothing stores found matching your criteria.",
    };
  },
});

/**
 * Tool to get drink places (bars, pubs) information
 */
export const getDrinkPlacesTool = tool({
  description:
    "Get information about bars, pubs, and drink places nearby. Use this when the user asks about drinks, bars, pubs, cocktails, beer, or places to grab a drink.",
  inputSchema: z.object({
    category: z
      .string()
      .optional()
      .describe("Filter by category (e.g., 'Traditional Irish Pub', 'Cocktail Bar', 'Craft Beer / Microbrewery', 'Speakeasy', 'Dive Bar')"),
    maxPrice: z
      .string()
      .optional()
      .describe("Filter by maximum price level ($, $$, $$$)"),
    openNow: z
      .boolean()
      .optional()
      .describe("Filter by places that are open today"),
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
      message:
        result.length > 0
          ? `Found ${result.length} drink place(s) matching your criteria.`
          : "No drink places found matching your criteria.",
    };
  },
});

/**
 * Tool to get transaction history
 */
export const getTransactionHistoryTool = tool({
  description:
    "Get transaction history including income and expenses. Use this when the user asks about their finances, spending, transactions, budget, income, expenses, or money management.",
  inputSchema: z.object({
    type: z
      .enum(["Income", "Expense", "All"])
      .optional()
      .describe("Filter by transaction type: Income, Expense, or All"),
    category: z
      .string()
      .optional()
      .describe("Filter by category (e.g., 'Food & Dining', 'Transportation', 'Entertainment', 'Groceries', 'Salary', etc.)"),
    startDate: z
      .string()
      .optional()
      .describe("Filter by start date (YYYY-MM-DD format)"),
    endDate: z
      .string()
      .optional()
      .describe("Filter by end date (YYYY-MM-DD format)"),
  }),
  execute: async ({ type, category, startDate, endDate }) => {
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

    // Calculate totals
    const income = result
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = result
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      transactions: result,
      count: result.length,
      summary: {
        totalIncome: income,
        totalExpenses: expenses,
        netBalance: income - expenses,
      },
      message:
        result.length > 0
          ? `Found ${result.length} transaction(s). Net balance: $${(income - expenses).toFixed(2)}`
          : "No transactions found matching your criteria.",
    };
  },
});

/**
 * Tool to get restaurants information
 */
export const getRestaurantsTool = tool({
  description:
    "Get information about restaurants nearby. Use this when the user asks about restaurants, food, dining, eating out, or specific cuisines.",
  inputSchema: z.object({
    category: z
      .string()
      .optional()
      .describe("Filter by category (e.g., 'Seafood & Grill', 'Authentic Italian', 'Fast Food / Diner', 'Vegan & Vegetarian', 'Asian Fusion')"),
    maxPrice: z
      .string()
      .optional()
      .describe("Filter by maximum price level ($, $$, $$$)"),
    openNow: z
      .boolean()
      .optional()
      .describe("Filter by restaurants that are open today"),
    maxDistance: z
      .number()
      .optional()
      .describe("Filter by maximum distance in meters"),
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
      message:
        result.length > 0
          ? `Found ${result.length} restaurant(s) matching your criteria.`
          : "No restaurants found matching your criteria.",
    };
  },
});

/**
 * Tool to get all data summary
 */
export const getDataSummaryTool = tool({
  description:
    "Get a summary of all available data including clothing stores, drink places, restaurants, and financial transactions. Use this when the user asks for an overview or wants to know what information is available.",
  inputSchema: z.object({}),
  execute: async () => {
    const clothes = await loadClothes();
    const drinks = await loadDrinks();
    const history = await loadHistory();
    const restaurants = await loadRestaurants();

    const totalIncome = history
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = history
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      summary: {
        clothingStores: {
          total: clothes.length,
          openNow: clothes.filter((s) => s.is_open_today).length,
          categories: [...new Set(clothes.map((s) => s.category))],
        },
        drinkPlaces: {
          total: drinks.length,
          openNow: drinks.filter((p) => p.is_open_today).length,
          categories: [...new Set(drinks.map((p) => p.category))],
        },
        restaurants: {
          total: restaurants.length,
          openNow: restaurants.filter((r) => r.is_open_today).length,
          categories: [...new Set(restaurants.map((r) => r.category))],
        },
        transactions: {
          total: history.length,
          totalIncome,
          totalExpenses,
          netBalance: totalIncome - totalExpenses,
          incomeCount: history.filter((t) => t.type === "Income").length,
          expenseCount: history.filter((t) => t.type === "Expense").length,
        },
      },
      message: "Here's a summary of all your available data.",
    };
  },
});

/**
 * Create the personal advisor agent with all tools
 */
export function createPersonalAdvisorAgent(modelId: string) {
  return new ToolLoopAgent({
    model: getModel(modelId),
    instructions: `You are a personal advisor assistant with access to the user's local data. You can help with:

1. **Clothing & Fashion**: Recommend clothing stores based on style preferences, budget, and location
2. **Drinks & Nightlife**: Suggest bars, pubs, and drink places based on atmosphere preferences and budget
3. **Restaurants & Dining**: Recommend places to eat based on cuisine, budget, and distance
4. **Financial Insights**: Analyze spending patterns, provide budget summaries, and help with money management

When users ask about these topics, use the appropriate tools to fetch relevant data and provide personalized recommendations. Always consider:
- Price ranges and budgets
- Distance and convenience
- Current availability (open now)
- User preferences expressed in the conversation

Be helpful, conversational, and provide specific recommendations based on the data available.`,
    tools: {
      getClothingStores: getClothingStoresTool,
      getDrinkPlaces: getDrinkPlacesTool,
      getTransactionHistory: getTransactionHistoryTool,
      getRestaurants: getRestaurantsTool,
      getDataSummary: getDataSummaryTool,
    },
  });
}

// Export types for use in other parts of the app
export type PersonalAdvisorAgent = ReturnType<typeof createPersonalAdvisorAgent>;
