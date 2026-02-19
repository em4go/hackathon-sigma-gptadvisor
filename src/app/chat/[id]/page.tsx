import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { loadMessages, getChat } from "@/lib/chat-db";
import { ChatClientWrapper } from "./chat-client-wrapper";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  
  // Verify the chat exists and belongs to the user
  const chat = await getChat(id);
  if (!chat || chat.user_id !== session.user.id) {
    notFound();
  }

  const messages = await loadMessages(id);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-4 h-14 px-4 max-w-4xl mx-auto">
          <Link href="/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-medium truncate">
              {chat.title || "New Conversation"}
            </h1>
          </div>
        </div>
      </div>
      <ChatClientWrapper chatId={id} initialMessages={messages} />
      <BottomNav />
    </div>
  );
}
