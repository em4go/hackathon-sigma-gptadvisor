import { createAgentUIStreamResponse, UIMessage } from "ai";
import { createPersonalAdvisorAgent } from "@/lib/agent";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
  }: {
    messages: UIMessage[];
    model: string;
  } = await req.json();

  // Create the agent with the selected model
  const agent = createPersonalAdvisorAgent(model);

  // Use the agent to generate a streaming response
  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
  });
}
