import { createAgentUIStreamResponse, UIMessage } from "ai";
import { createPersonalAdvisorAgent } from "@/lib/agent";
import { loadMessages, saveMessages, updateChatTitle } from "@/lib/chat-db";
import { getCachedFinancialContext, formatFinancialContextForPrompt } from "@/lib/financial-context";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    chatId,
    model,
  }: {
    messages: UIMessage[];
    chatId: string;
    model: string;
  } = await req.json();

  // Load previous messages from database
  const previousMessages = chatId ? await loadMessages(chatId) : [];
  
  // Combine previous messages with new ones
  const allMessages = [...previousMessages, ...messages];

  // Generate title from first user message if this is a new chat with no title yet
  const shouldGenerateTitle = previousMessages.length === 0 && messages.length > 0;
  const firstUserMessage = shouldGenerateTitle 
    ? messages.find(m => m.role === "user")?.parts.find(p => p.type === "text")?.text 
    : null;

  // Get the user's current financial context
  // This provides the agent with real-time data about their finances
  const financialContext = await getCachedFinancialContext();
  const contextString = formatFinancialContextForPrompt(financialContext);

  // Create the agent with the selected model and financial context
  const agent = createPersonalAdvisorAgent(model, contextString);

  // Use the agent to generate a streaming response
  return createAgentUIStreamResponse({
    agent,
    uiMessages: allMessages,
    onFinish: async ({ messages: finalMessages }) => {
      if (chatId) {
        await saveMessages(chatId, finalMessages);
        
        // Generate title from first message if needed
        if (firstUserMessage && firstUserMessage.length > 0) {
          const title = firstUserMessage.slice(0, 50) + (firstUserMessage.length > 50 ? "..." : "");
          await updateChatTitle(chatId, title);
        }
      }
    },
  });
}
