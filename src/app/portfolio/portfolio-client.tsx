"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetChartModal } from "@/components/portfolio/asset-chart-modal";
import {
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Wallet,
  Bitcoin,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import portfolioData from "@/../data/inversions.json";

interface PortfolioClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface AssetAllocation {
  group: string;
  total_value: number;
  allocation_percentage: number;
  performance_percentage: number;
  description?: string;
}

interface Position {
  symbol: string;
  name: string;
  group: string;
  quantity: number;
  current_price: number;
  total_value: number;
  profit_loss_percentage: number;
}

interface HistoricalData {
  month: string;
  value: number;
}

interface PortfolioData {
  portfolio_summary: {
    total_invested: number;
    current_value: number;
    total_profit_loss: number;
    total_profit_loss_percentage: number;
    currency: string;
  };
  asset_allocation: AssetAllocation[];
  positions: Position[];
  historical_evolution_6m: HistoricalData[];
}

const data = portfolioData as PortfolioData;

const groupColors: Record<string, string> = {
  Crypto: "#F59E0B",
  ETFs: "#10B981",
  Stocks: "#3B82F6",
  Others: "#8B5CF6",
};

const groupIcons: Record<string, React.ElementType> = {
  Crypto: Bitcoin,
  ETFs: BarChart3,
  Stocks: TrendingUp,
  Others: PieChart,
};

export function PortfolioClient({ user }: PortfolioClientProps) {
  const [showValues, setShowValues] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<{
    symbol: string;
    name: string;
    group: string;
  } | null>(null);
  const userName = user.name || user.email?.split("@")[0] || "User";
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.portfolio_summary.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  };

  // Calculate chart dimensions for evolution line
  const maxValue = Math.max(...data.historical_evolution_6m.map((d) => d.value));
  const minValue = Math.min(...data.historical_evolution_6m.map((d) => d.value));
  const valueRange = maxValue - minValue;

  const getChartPoints = () => {
    const width = 100;
    const height = 40;
    const points = data.historical_evolution_6m.map((d, i) => {
      const x = (i / (data.historical_evolution_6m.length - 1)) * width;
      const y = height - ((d.value - minValue) / valueRange) * height;
      return `${x},${y}`;
    });
    return points.join(" ");
  };

  const isProfit = data.portfolio_summary.total_profit_loss >= 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
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
          <Button
            variant="ghost"
            size="icon"
            className="size-10"
            onClick={() => setShowValues(!showValues)}
          >
            {showValues ? (
              <EyeOff className="size-5 text-muted-foreground" />
            ) : (
              <Eye className="size-5 text-muted-foreground" />
            )}
          </Button>
        </div>

        {/* Portfolio Summary Card */}
        <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="size-5 text-primary" />
              <span className="text-muted-foreground font-medium">
                Portfolio Value
              </span>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">
                {showValues
                  ? formatCurrency(data.portfolio_summary.current_value)
                  : "••••••"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center size-6 rounded-full ${
                    isProfit ? "bg-emerald-500/20" : "bg-red-500/20"
                  }`}
                >
                  {isProfit ? (
                    <TrendingUp className="size-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="size-3.5 text-red-500" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isProfit ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {showValues
                    ? `${formatCurrency(
                        data.portfolio_summary.total_profit_loss
                      )} (${formatPercentage(
                        data.portfolio_summary.total_profit_loss_percentage
                      )})`
                    : "••••"}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Invested: {" "}
                {showValues
                  ? formatCurrency(data.portfolio_summary.total_invested)
                  : "••••"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evolution Chart */}
        <Card className="mb-6 bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <LineChart className="size-4 text-primary" />
              6 Month Evolution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-32 w-full">
              <svg
                viewBox="0 0 100 40"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,40 ${getChartPoints()} 100,40`}
                  fill="url(#lineGradient)"
                />
                <polyline
                  points={getChartPoints()}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {data.historical_evolution_6m.map((d, i) => (
                <span key={i}>
                  {d.month.split(" ")[0]}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="mb-6 bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <PieChart className="size-4 text-primary" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {data.asset_allocation.map((asset) => {
                const Icon = groupIcons[asset.group] || DollarSign;
                const isPositive = asset.performance_percentage >= 0;
                return (
                  <div key={asset.group} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center size-8 rounded-full"
                          style={{
                            backgroundColor: `${groupColors[asset.group]}20`,
                          }}
                        >
                          <Icon
                            className="size-4"
                            style={{ color: groupColors[asset.group] }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{asset.group}</p>
                          <p className="text-xs text-muted-foreground">
                            {asset.description || `${asset.allocation_percentage}%`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          {showValues
                            ? formatCurrency(asset.total_value)
                            : "••••"}
                        </p>
                        <p
                          className={`text-xs ${
                            isPositive ? "text-emerald-500" : "text-red-500"
                          }`}
                        >
                          {formatPercentage(asset.performance_percentage)}
                        </p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${asset.allocation_percentage}%`,
                          backgroundColor: groupColors[asset.group],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Positions Tabs */}
        <Tabs defaultValue="all" className="w-full" suppressHydrationWarning>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="etfs">ETFs</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {data.positions.map((position) => (
              <PositionCard
                key={position.symbol}
                position={position}
                showValues={showValues}
                formatCurrency={formatCurrency}
                formatPercentage={formatPercentage}
                onClick={() => setSelectedPosition({
                  symbol: position.symbol,
                  name: position.name,
                  group: position.group,
                })}
              />
            ))}
          </TabsContent>

          {["Crypto", "ETFs", "Stocks"].map((group) => (
            <TabsContent key={group} value={group.toLowerCase()} className="space-y-3">
              {data.positions
                .filter((p) => p.group === group)
                .map((position) => (
                  <PositionCard
                    key={position.symbol}
                    position={position}
                    showValues={showValues}
                    formatCurrency={formatCurrency}
                    formatPercentage={formatPercentage}
                    onClick={() => setSelectedPosition({
                      symbol: position.symbol,
                      name: position.name,
                      group: position.group,
                    })}
                  />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Asset Chart Modal */}
      {selectedPosition && (
        <AssetChartModal
          symbol={selectedPosition.symbol}
          name={selectedPosition.name}
          group={selectedPosition.group}
          open={!!selectedPosition}
          onOpenChange={(open) => !open && setSelectedPosition(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}

interface PositionCardProps {
  position: Position;
  showValues: boolean;
  formatCurrency: (amount: number) => string;
  formatPercentage: (value: number) => string;
  onClick: () => void;
}

function PositionCard({
  position,
  showValues,
  formatCurrency,
  formatPercentage,
  onClick,
}: PositionCardProps) {
  const isPositive = position.profit_loss_percentage >= 0;
  const Icon = groupIcons[position.group] || DollarSign;

  return (
    <Card 
      className="bg-card border-border/50 hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center size-10 rounded-full shrink-0"
              style={{
                backgroundColor: `${groupColors[position.group]}20`,
              }}
            >
              <Icon
                className="size-5"
                style={{ color: groupColors[position.group] }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">
                  {position.symbol}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {position.group}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate max-w-[140px]">
                {position.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {position.quantity} × {" "}
                {showValues
                  ? formatCurrency(position.current_price)
                  : "••••"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">
              {showValues ? formatCurrency(position.total_value) : "••••"}
            </p>
            <div className="flex items-center justify-end gap-1">
              {isPositive ? (
                <TrendingUp className="size-3 text-emerald-500" />
              ) : (
                <TrendingDown className="size-3 text-red-500" />
              )}
              <span
                className={`text-sm ${
                  isPositive ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {formatPercentage(position.profit_loss_percentage)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
