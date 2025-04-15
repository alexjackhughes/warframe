"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@/components/terminal";
import { TerminalInput } from "@/components/terminal-input";
import { TerminalHeader } from "@/components/terminal-header";
import { RippleBackground } from "@/components/ripple-background";
import { useChat, type Message } from "@ai-sdk/react";

interface ChatProps {
  initialMessages: Message[];
}

export function Chat({ initialMessages }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    api: "/api/chat",
    onResponse: (response) => {
      console.log("Received response:", response);
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="relative z-10 min-h-screen">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-screen p-4">
        <TerminalHeader />
        <div className="flex-1 overflow-auto border border-green-500 p-2 rounded-sm mb-4 relative bg-black bg-opacity-20">
          <Terminal messages={messages} isTyping={false} />
          <div ref={messagesEndRef} />
        </div>
        <TerminalInput
          input={input}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
