import Link from "next/link";
import { Header } from "@/components/auth/header";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  TrendingUp, 
  MessageCircle,
  Building2,
  Wallet,
  PiggyBank,
  LineChart,
  Bot,
  CheckCircle2
} from "lucide-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const features = [
    {
      icon: Bot,
      title: "AI Financial Copilot",
      description: "Your personal finance assistant that learns your habits and provides tailored advice."
    },
    {
      icon: Building2,
      title: "Bank Integration",
      description: "Connect all your bank accounts securely. Real-time sync with 10,000+ financial institutions."
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "AI-powered analysis of your spending patterns with actionable recommendations."
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption, SOC 2 compliant, and read-only access to your accounts."
    }
  ];

  const capabilities = [
    { icon: Wallet, label: "Expense Tracking", desc: "Automatic categorization" },
    { icon: PiggyBank, label: "Savings Goals", desc: "AI-optimized plans" },
    { icon: LineChart, label: "Cash Flow", desc: "Predictive analytics" },
    { icon: MessageCircle, label: "Ask Anything", desc: "Natural language queries" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-background to-cyan-500/5" />
        
        <div className="relative container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Powered by AI
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
              Your AI Copilot for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                Financial Health
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Connect your banks, get personalized insights, and achieve your financial goals 
              with an intelligent assistant that understands your money.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {session ? (
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 min-w-[200px]">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 min-w-[200px]">
                    <Link href="/login">
                      Get Started Free
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                    <Link href="/login">View Demo</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Bank-level security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview / Dashboard Mockup */}
      <section className="container mx-auto px-6 pb-20">
        <div className="relative max-w-5xl mx-auto">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-50" />
          
          {/* Mockup container */}
          <div className="relative bg-card rounded-2xl border shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground">
                  app.financeai.com/dashboard
                </div>
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Balance card */}
                <div className="md:col-span-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                  <p className="text-emerald-100 text-sm mb-1">Total Balance</p>
                  <p className="text-4xl font-bold mb-4">$24,563.89</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12.5% this month</span>
                  </div>
                </div>
                
                {/* AI Insight card */}
                <div className="bg-muted rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-medium text-sm">AI Insight</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "You're spending 23% more on dining out. Consider setting a weekly budget of $150."
                  </p>
                </div>
                
                {/* Connected banks */}
                <div className="bg-card border rounded-xl p-6">
                  <p className="text-sm font-medium mb-4">Connected Accounts</p>
                  <div className="space-y-3">
                    {["Chase", "Bank of America", "Fidelity"].map((bank) => (
                      <div key={bank} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm">{bank}</span>
                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick stats */}
                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                  {[
                    { label: "Income", value: "$8,420", color: "text-emerald-500" },
                    { label: "Expenses", value: "$5,230", color: "text-red-500" },
                    { label: "Savings", value: "$3,190", color: "text-cyan-500" }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-muted rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to master your money
          </h2>
          <p className="text-muted-foreground text-lg">
            Intelligent tools that work together to give you complete control over your finances.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-muted/50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ask questions in plain English
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                No more complicated spreadsheets or confusing reports. Just ask your AI copilot 
                anything about your finances and get instant, actionable answers.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((cap) => (
                  <div key={cap.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <cap.icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{cap.label}</p>
                      <p className="text-xs text-muted-foreground">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat interface mockup */}
            <div className="bg-card rounded-2xl border shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Finance AI</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                    <p className="text-sm">How much did I spend on groceries last month?</p>
                  </div>
                </div>
                
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-none px-4 py-3">
                    <p className="text-sm">
                      You spent $487 on groceries in January. That's $52 less than December. 
                      Great job staying under budget!
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                    <p className="text-sm">What's my top spending category?</p>
                  </div>
                </div>
                
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-none px-4 py-3">
                    <p className="text-sm">
                      Housing is your top category at 32% ($2,400), followed by Food & Dining at 18% ($1,350).
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-full">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Ask anything about your finances...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Integration Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect your banks in seconds
          </h2>
          <p className="text-muted-foreground text-lg">
            Securely link all your accounts in one place. We support 10,000+ financial institutions.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          {["Chase", "Bank of America", "Wells Fargo", "Citi", "Capital One", "Fidelity", "Schwab"].map((bank) => (
            <div key={bank} className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">{bank}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 px-6 py-3 bg-muted rounded-full">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="text-sm">256-bit encryption • SOC 2 compliant • Read-only access</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-8 md:p-16 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-emerald-50 text-lg max-w-xl mx-auto mb-8">
              Join thousands of users who are already improving their financial health with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-white/90 gap-2 min-w-[200px]">
                <Link href="/login">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-emerald-100">
              No credit card required • Free plan available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Σ</span>
            </div>
            <span className="font-semibold">Finance AI</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2026 Finance AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
