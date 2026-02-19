import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { LogoutButton } from "@/components/auth/logout-button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, User, Bell, Shield } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#09090b] pb-24">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Card className="bg-card border-border/50 mb-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Settings className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
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
                  <span className="text-sm font-medium text-white flex-1">
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
