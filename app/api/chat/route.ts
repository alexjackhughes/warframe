import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    console.log("Received chat request");
    const { messages } = await req.json();
    console.log("Messages received:", JSON.stringify(messages, null, 2));

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      messages,
    });

    console.log("Streaming response...");
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
