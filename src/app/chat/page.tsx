import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default async function ChatPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#09090b] pb-24">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Card className="bg-card border-border/50">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Chat
            </h2>
            <p className="text-muted-foreground">
              Your conversations will appear here.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
