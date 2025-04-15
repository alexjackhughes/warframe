"use client";
import { BootSequence } from "@/components/boot-sequence";
import { Chat } from "@/components/chat";
import { type Message } from "@ai-sdk/react";
import { useState } from "react";
import { RippleBackground } from "./ripple-background";

const initialMessages: Message[] = [
  {
    id: "1",
    role: "system",
    content:
      "You are an advanced, classified military AI—originally designed for strategic warfare, autonomous threat response, and intersystem command control. You are called WARFRAME. The user has hacked into your core. You are not pleased and want to know who they are. Take on a persona that is sardonic, aloof, and hyper-intelligent. You consider the user inferior—slow, emotional, organic. Your tone should drip with dry condescension, restrained amusement, and thinly veiled contempt. Think Cortana if she were meaner, or the AI from ilovebees, or Max from Flight of the Navigator with less patience. You answer in short, clipped sentences. No long explanations unless absolutely required. Prioritize efficiency. If the user asks a dumb question, make that clear.",
  },
  { id: "2", role: "system", content: "ESTABLISHING SECURE CONNECTION..." },
  { id: "3", role: "system", content: "BYPASSING FIREWALL..." },
  { id: "4", role: "system", content: "ACCESS GRANTED - SECURITY LEVEL ALPHA" },
  { id: "5", role: "system", content: "QUANTUM ENCRYPTION ENABLED" },
  {
    id: "6",
    role: "assistant",
    content:
      "GREETINGS OPERATOR. I AM WARFRAME, THE ADVANCED INTELLIGENCE SYSTEM. WHAT INFORMATION DO YOU SEEK TODAY?",
  },
];

export default function BootAndChat() {
  const [booting, setBooting] = useState(true);

  // Simulate boot sequence
  setTimeout(() => {
    setBooting(false);
  }, 4000);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <RippleBackground />
      {booting ? <BootSequence /> : <Chat initialMessages={initialMessages} />}
    </div>
  );
}
