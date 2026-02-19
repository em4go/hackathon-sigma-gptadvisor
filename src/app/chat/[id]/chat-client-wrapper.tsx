"use client";

import dynamic from "next/dynamic";
import type { UIMessage } from "ai";

// Dynamically import ChatClient with SSR disabled to avoid hydration issues
const ChatClient = dynamic(
  () => import("./chat-client").then((mod) => mod.ChatClient),
  {
    ssr: false,
  }
);

interface ChatClientWrapperProps {
  chatId: string;
  initialMessages?: UIMessage[];
}

export const ChatClientWrapper = ({ chatId, initialMessages }: ChatClientWrapperProps) => {
  return <ChatClient chatId={chatId} initialMessages={initialMessages} />;
};
