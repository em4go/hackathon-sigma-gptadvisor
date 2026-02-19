"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/navigation/bottom-nav";
import {
  Eye,
  Trophy,
  TrendingUp,
  Flame,
  PiggyBank,
} from "lucide-react";

interface DashboardClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardClient({ user }: DashboardClientProps) {
  const userName = user.name || user.email?.split("@")[0] || "User";
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  // Mock data - replace with real data from your API
  const stats = {
    totalBalance: 12450.0,
    balanceChange: 4.2,
    todayBudget: { current: 12, total: 50 },
    streak: 14,
    netWorth: 850,
    xp: { current: 850, total: 1000, level: 5 },
  };

  const quests = [
    {
      id: 1,
      icon: Flame,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-500",
      title: "7-Day No-Spend",
      description: "Avoid non-essential spending.",
      progress: 3,
      total: 7,
      xp: 50,
      daysLeft: 3,
      color: "bg-orange-500",
    },
    {
      id: 2,
      icon: PiggyBank,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      title: "Coffee Fast",
      description: "Skip the cafe, save money.",
      progress: 24,
      total: 30,
      saved: 24,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="size-12 border-2 border-primary/20">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {userName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                Lvl {stats.xp.level}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{greeting},</p>
              <h2 className="text-xl font-semibold text-foreground capitalize">
                {userName}
              </h2>
            </div>
          </div>

          {/* XP Progress */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary">SAVER</span>
              <span className="text-xs text-muted-foreground">
                {stats.xp.current}/{stats.xp.total} XP
              </span>
            </div>
            <div className="w-24">
              <Progress value={(stats.xp.current / stats.xp.total) * 100} />
            </div>
          </div>
        </div>

        {/* Total Balance Card */}
        <Card className="mb-6 bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-muted-foreground">Total Balance</span>
              <Button variant="ghost" size="icon" className="size-8">
                <Eye className="size-4 text-muted-foreground" />
              </Button>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-white">
                ${stats.totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
              >
                <TrendingUp className="size-3 mr-1" />+
                {stats.balanceChange}%
              </Badge>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Today's Budget */}
          <Card className="bg-card border-border/50 row-span-2">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <span className="text-muted-foreground text-sm mb-4">
                Today&apos;s Budget
              </span>
              <CircularProgress
                value={stats.todayBudget.current}
                max={stats.todayBudget.total}
                size={100}
                strokeWidth={6}
                className="text-primary mb-3"
              >
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">
                    ${stats.todayBudget.current}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    of ${stats.todayBudget.total}
                  </p>
                </div>
              </CircularProgress>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="size-4 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-500 uppercase tracking-wide">
                  Streak
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.streak} Days
              </div>
              <p className="text-xs text-muted-foreground">Perfect tracking</p>
            </CardContent>
          </Card>

          {/* Net Worth */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="size-4 text-purple-500" />
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wide">
                  Net Worth
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                + ${stats.netWorth}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Quests */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Quests</h3>
            <Button variant="link" size="sm" className="text-primary">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {quests.map((quest) => (
              <Card
                key={quest.id}
                className="bg-card border-border/50 overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`${quest.iconBg} p-2.5 rounded-xl shrink-0`}
                    >
                      <quest.icon className={`size-5 ${quest.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white truncate">
                          {quest.title}
                        </h4>
                        {quest.daysLeft && (
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {quest.daysLeft} days left
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {quest.xp
                          ? `DAY ${quest.progress} OF ${quest.total}`
                          : `${quest.progress} DAYS`}
                      </span>
                      {quest.xp ? (
                        <span className="text-xs text-orange-500 font-medium">
                          +{quest.xp} XP
                        </span>
                      ) : (
                        <span className="text-xs text-blue-500 font-medium">
                          ${quest.saved} SAVED
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${quest.color} rounded-full transition-all duration-500`}
                        style={{
                          width: `${(quest.progress / quest.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
