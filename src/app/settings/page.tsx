import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { LogoutButton } from "@/components/auth/logout-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";
import Link from "next/link";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { BankSyncButton } from "@/components/settings/bank-sync-button";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const settingsItems = [
    {
      icon: User,
      label: "Profile",
      href: "#profile",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "#notifications",
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      href: "#privacy",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {/* Theme Settings */}
        <Card className="bg-card border-border/50 mb-4">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Palette className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>
                  Customize the application theme
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ThemeSelector />
          </CardContent>
        </Card>

        {/* Bank Integration */}
        <Card className="bg-card border-border/50 mb-4">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Settings className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Bank Integration</CardTitle>
                <CardDescription>
                  Connect your bank accounts to sync your data
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BankSyncButton />
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 mb-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Settings className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Settings Page
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your account preferences
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {settingsItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground flex-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <LogoutButton />
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
