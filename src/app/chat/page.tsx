import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserChats, createChat, deleteChat } from "@/lib/chat-db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, MessageCircle, Plus, Clock } from "lucide-react";
import { BottomNav } from "@/components/navigation/bottom-nav";

export default async function ChatListPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const chats = await getUserChats(session.user.id);

  async function handleCreateChat() {
    "use server";
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) redirect("/login");
    
    const id = await createChat(session.user.id);
    redirect(`/chat/${id}`);
  }

  async function handleDeleteChat(formData: FormData) {
    "use server";
    const chatId = formData.get("chatId") as string;
    await deleteChat(chatId);
    redirect("/chat");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Your Conversations</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Continue a conversation or start a new one
            </p>
          </div>
          <form action={handleCreateChat}>
            <Button type="submit" className="gap-2">
              <Plus className="size-4" />
              New Chat
            </Button>
          </form>
        </div>

        {chats.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageCircle className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
              <p className="text-muted-foreground mb-6">
                Start a new chat to get personalized recommendations
              </p>
              <form action={handleCreateChat}>
                <Button type="submit">Start Your First Chat</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => (
              <Card key={chat.id} className="group hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/chat/${chat.id}`} 
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                          <MessageCircle className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium truncate">
                            {chat.title || "New Conversation"}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="size-3" />
                            <span>
                              {new Date(chat.updated_at).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <form action={handleDeleteChat} className="ml-4">
                      <input type="hidden" name="chatId" value={chat.id} />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
