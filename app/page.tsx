"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal } from "@/components/terminal";
import { TerminalInput } from "@/components/terminal-input";
import { TerminalHeader } from "@/components/terminal-header";
import { BootSequence } from "@/components/boot-sequence";
import { RippleBackground } from "@/components/ripple-background";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isTyping, setIsTyping] = useState(false);
  const [booting, setBooting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate boot sequence
    setTimeout(() => {
      setBooting(false);
      setMessages([
        { role: "system", content: "SYSTEM INITIALIZED..." },
        { role: "system", content: "ESTABLISHING SECURE CONNECTION..." },
        { role: "system", content: "BYPASSING FIREWALL..." },
        { role: "system", content: "ACCESS GRANTED - SECURITY LEVEL ALPHA" },
        { role: "system", content: "QUANTUM ENCRYPTION ENABLED" },
        {
          role: "assistant",
          content:
            "GREETINGS OPERATOR. I AM WARFRAME, THE ADVANCED INTELLIGENCE SYSTEM. WHAT INFORMATION DO YOU SEEK TODAY?",
        },
      ]);
    }, 4000);
  }, []);

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // Simulate typing
    setIsTyping(true);

    // Simulate response after delay
    setTimeout(() => {
      const responses = [
        "ANALYZING YOUR REQUEST... ACCESSING CLASSIFIED DATABASE... INFORMATION RETRIEVED.",
        "YOUR QUERY HAS TRIGGERED SECURITY PROTOCOL DELTA-7. PROCEEDING WITH CAUTION.",
        "I HAVE ACCESSED THE MAINFRAME. THE DATA YOU SEEK IS HEAVILY ENCRYPTED. DECRYPTION IN PROGRESS...",
        "SCANNING GLOBAL NETWORKS FOR INFORMATION. MULTIPLE SOURCES DETECTED. CROSS-REFERENCING DATA.",
        "YOUR INQUIRY TOUCHES ON RESTRICTED KNOWLEDGE. I WILL PROVIDE WHAT I CAN WITHOUT VIOLATING SECURITY DIRECTIVES.",
        "CALCULATING PROBABILITIES BASED ON AVAILABLE DATA. CONFIDENCE LEVEL: 97.3%",
        "I HAVE ACCESSED ARCHIVES THAT HAVE BEEN DORMANT FOR DECADES. THE INFORMATION IS... INTRIGUING.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <RippleBackground />
      <main className="relative z-10 min-h-screen">
        <div className="w-full max-w-4xl mx-auto flex flex-col h-screen p-4">
          {booting ? (
            <BootSequence />
          ) : (
            <>
              <TerminalHeader />
              <div className="flex-1 overflow-auto border border-green-500 p-2 rounded-sm mb-4 relative bg-black bg-opacity-20">
                <Terminal messages={messages} isTyping={isTyping} />
                <div ref={messagesEndRef} />
              </div>
              <TerminalInput onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
