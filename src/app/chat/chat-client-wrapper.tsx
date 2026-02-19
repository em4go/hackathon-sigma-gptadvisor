"use client";

import dynamic from "next/dynamic";

// Dynamically import ChatClient with SSR disabled to avoid hydration issues
// with Radix UI components that generate unique IDs
const ChatClient = dynamic(
  () => import("./chat-client").then((mod) => mod.ChatClient),
  {
    ssr: false,
  }
);

export const ChatClientWrapper = () => {
  return <ChatClient />;
};
