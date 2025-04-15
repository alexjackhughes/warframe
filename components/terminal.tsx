"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./markdown-renderer";

interface TerminalProps {
  messages: { id: string; role: string; content: string }[];
  isTyping: boolean;
}

export function Terminal({ messages, isTyping }: TerminalProps) {
  const [cursor, setCursor] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    // Blinking cursor effect
    const interval = setInterval(() => {
      setCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Type-writer effect for the latest assistant message
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant" &&
      !isTypingResponse
    ) {
      setIsTypingResponse(true);
      setTypedText("");
      setCurrentMessageIndex(messages.length - 1);
      setCurrentCharIndex(0);
    }
  }, [messages]);

  useEffect(() => {
    if (isTypingResponse && currentMessageIndex < messages.length) {
      const message = messages[currentMessageIndex].content;

      if (currentCharIndex < message.length) {
        const timer = setTimeout(() => {
          setTypedText((prev) => prev + message[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, 15); // Speed of typing

        return () => clearTimeout(timer);
      } else {
        setIsTypingResponse(false);
      }
    }
  }, [isTypingResponse, currentCharIndex, currentMessageIndex, messages]);

  return (
    <div className="font-mono text-green-500 text-sm md:text-base relative">
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>
      {messages
        .filter((message) => message.id !== "1")
        .map((message, index) => (
          <div key={message.id} className="mb-2">
            <div className="flex">
              <span
                className={cn(
                  "mr-2",
                  message.role === "system" && "text-yellow-500 capitalize",
                  message.role === "assistant" &&
                    "text-green-500 font-bold uppercase",
                  message.role === "user" && "text-green-300"
                )}
              >
                {message.role === "user"
                  ? ">"
                  : message.role === "system"
                  ? "#"
                  : "$"}
              </span>
              <span
                className={cn(
                  "break-words",
                  message.role === "system" && "text-yellow-500",
                  message.role === "assistant" && "text-green-500 uppercase",
                  message.role === "user" && "text-green-300",
                  index === currentMessageIndex && isTypingResponse && "blink"
                )}
              >
                {index === currentMessageIndex && isTypingResponse ? (
                  typedText
                ) : message.role === "assistant" ? (
                  <MarkdownRenderer content={message.content} />
                ) : (
                  message.content
                )}
              </span>
            </div>
          </div>
        ))}
      {isTyping && (
        <div className="flex">
          <span className="mr-2 text-green-500 font-bold">$</span>
          <span
            className={cn(
              "text-green-500",
              cursor ? "opacity-100" : "opacity-0"
            )}
          >
            _
          </span>
        </div>
      )}
    </div>
  );
}
