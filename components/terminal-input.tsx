"use client";

import { useState, type KeyboardEvent } from "react";

interface TerminalInputProps {
  onSendMessage: (message: string) => void;
}

export function TerminalInput({ onSendMessage }: TerminalInputProps) {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Play key press sound
    const audio = new Audio("/key-press.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => {});

    if (e.key === "Enter") {
      if (input.trim() !== "") {
        onSendMessage(input);
        setCommandHistory((prev) => [...prev, input]);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="flex items-center border border-green-500 p-6 rounded-sm relative bg-black bg-opacity-20">
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>
      <span className="text-green-500 mr-2 font-mono font-bold">{">"}</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-green-500 placeholder:text-green-500 outline-none font-mono text-sm md:text-base"
        placeholder="ENTER COMMAND..."
        autoFocus
      />
    </div>
  );
}
