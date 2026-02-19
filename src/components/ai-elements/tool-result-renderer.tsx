"use client";

import type { ToolUIPart, DynamicToolUIPart } from "ai";
import { cn } from "@/lib/utils";
import {
  RestaurantCard,
  StoreCard,
  DrinkCard,
  CardGrid,
  type Restaurant,
  type Store,
  type DrinkPlace,
} from "./tool-result-cards";
import { TransactionSummary, type TransactionSummaryData } from "./transaction-summary";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Utensils,
  ShoppingBag,
  Beer,
  TrendingUp,
  Info,
  Store as StoreIcon,
} from "lucide-react";

// Type for tool output detection
type ToolOutputType = 
  | "restaurants" 
  | "stores" 
  | "drink-places" 
  | "transactions" 
  | "data-summary"
  | "unknown";

// Helper to detect the type of tool output
function detectOutputType(output: unknown): ToolOutputType {
  if (!output || typeof output !== "object") return "unknown";
  
  const obj = output as Record<string, unknown>;
  
  // Check for restaurants
  if (Array.isArray(obj.restaurants) && obj.restaurants.length > 0) {
    return "restaurants";
  }
  
  // Check for clothing stores
  if (Array.isArray(obj.stores) && obj.stores.length > 0) {
    return "stores";
  }
  
  // Check for drink places
  if (Array.isArray(obj.places) && obj.places.length > 0) {
    const firstPlace = obj.places[0] as Record<string, unknown>;
    if (firstPlace.signature_drink !== undefined) {
      return "drink-places";
    }
  }
  
  // Check for transactions
  if (obj.summary && typeof obj.summary === "object" && 
      (obj.summary as Record<string, unknown>).totalIncome !== undefined) {
    return "transactions";
  }
  
  // Check for data summary
  if (obj.summary && typeof obj.summary === "object" &&
      (obj.summary as Record<string, unknown>).clothingStores !== undefined) {
    return "data-summary";
  }
  
  return "unknown";
}

// Data Summary Card
interface DataSummaryProps {
  data: {
    summary: {
      clothingStores: {
        total: number;
        openNow: number;
        categories: string[];
      };
      drinkPlaces: {
        total: number;
        openNow: number;
        categories: string[];
      };
      restaurants: {
        total: number;
        openNow: number;
        categories: string[];
      };
      transactions: {
        total: number;
        totalIncome: number;
        totalExpenses: number;
        netBalance: number;
        incomeCount: number;
        expenseCount: number;
      };
    };
    message: string;
  };
  className?: string;
}

const DataSummaryCard = ({ data, className }: DataSummaryProps) => {
  const { summary } = data;
  const isPositive = summary.transactions.netBalance >= 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Data Overview</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Places Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Utensils className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Restaurants</span>
            </div>
            <p className="text-2xl font-bold">{summary.restaurants.total}</p>
            <p className="text-xs text-muted-foreground">
              {summary.restaurants.openNow} open now
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Stores</span>
            </div>
            <p className="text-2xl font-bold">{summary.clothingStores.total}</p>
            <p className="text-xs text-muted-foreground">
              {summary.clothingStores.openNow} open now
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Beer className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Drinks</span>
            </div>
            <p className="text-2xl font-bold">{summary.drinkPlaces.total}</p>
            <p className="text-xs text-muted-foreground">
              {summary.drinkPlaces.openNow} open now
            </p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Financial Summary</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Income</p>
              <p className="text-sm font-semibold text-green-600">
                ${summary.transactions.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Expenses</p>
              <p className="text-sm font-semibold text-red-600">
                ${summary.transactions.totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className={cn(
                "text-sm font-semibold",
                isPositive ? "text-blue-600" : "text-orange-600"
              )}>
                ${summary.transactions.netBalance.toFixed(2)}
              </p>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-2">
            {summary.transactions.total} transactions
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-muted-foreground">Restaurants:</span>
            {summary.restaurants.categories.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
            ))}
            {summary.restaurants.categories.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{summary.restaurants.categories.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Tool Result Renderer Component
interface ToolResultRendererProps {
  output: unknown;
  className?: string;
}

export const ToolResultRenderer = ({ output, className }: ToolResultRendererProps) => {
  const outputType = detectOutputType(output);

  switch (outputType) {
    case "restaurants": {
      const data = output as { restaurants: Restaurant[]; count: number; message: string };
      return (
        <div className={cn("space-y-3", className)}>
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{data.message}</span>
          </div>
          <CardGrid>
            {data.restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </CardGrid>
        </div>
      );
    }

    case "stores": {
      const data = output as { stores: Store[]; count: number; message: string };
      return (
        <div className={cn("space-y-3", className)}>
          <div className="flex items-center gap-2">
            <StoreIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{data.message}</span>
          </div>
          <CardGrid>
            {data.stores.map((store, index) => (
              <StoreCard key={index} store={store} />
            ))}
          </CardGrid>
        </div>
      );
    }

    case "drink-places": {
      const data = output as { places: DrinkPlace[]; count: number; message: string };
      return (
        <div className={cn("space-y-3", className)}>
          <div className="flex items-center gap-2">
            <Beer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{data.message}</span>
          </div>
          <CardGrid>
            {data.places.map((place, index) => (
              <DrinkCard key={index} place={place} />
            ))}
          </CardGrid>
        </div>
      );
    }

    case "transactions": {
      const data = output as TransactionSummaryData;
      return (
        <TransactionSummary 
          data={data} 
          className={className}
        />
      );
    }

    case "data-summary": {
      const data = output as DataSummaryProps["data"];
      return (
        <DataSummaryCard 
          data={data} 
          className={className}
        />
      );
    }

    default:
      return null;
  }
};

// Helper to check if output should be rendered as rich content
export function hasRichContent(output: unknown): boolean {
  return detectOutputType(output) !== "unknown";
}

// Re-export types for consumers
export type { 
  Restaurant, 
  Store, 
  DrinkPlace, 
  TransactionSummaryData,
  ToolOutputType 
};
export { detectOutputType };
