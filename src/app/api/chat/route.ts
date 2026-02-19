import { getModel } from "@/lib/models";
import { streamText, UIMessage, convertToModelMessages } from "ai";

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

  const result = streamText({
    model: getModel(model),
    messages: await convertToModelMessages(messages),
    system:
      "You are a helpful AI coding assistant. You help users with programming tasks, debugging, and explaining code concepts.",
  });

  return result.toUIMessageStreamResponse();
}
