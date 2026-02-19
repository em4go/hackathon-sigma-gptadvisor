import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChatClientWrapper } from "./chat-client-wrapper";
import { BottomNav } from "@/components/navigation/bottom-nav";

export default async function ChatPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <ChatClientWrapper />
      <BottomNav />
    </div>
  );
}
