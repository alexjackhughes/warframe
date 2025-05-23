"use client";

import {
  useState,
  type KeyboardEvent,
  useEffect,
  useRef,
  type ChangeEvent,
} from "react";

interface TerminalInputProps {
  input: string;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
}

export function TerminalInput({
  input,
  onInputChange,
  onSubmit,
}: TerminalInputProps) {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Play key press sound
    const audio = new Audio("/key-press.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => {});

    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (input.trim() !== "") {
        onSubmit();
        setCommandHistory((prev) => [...prev, input]);
        onInputChange({
          target: { value: "" },
        } as ChangeEvent<HTMLInputElement>);
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
        onInputChange({
          target: {
            value: commandHistory[commandHistory.length - 1 - newIndex],
          },
        } as ChangeEvent<HTMLInputElement>);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        onInputChange({
          target: {
            value: commandHistory[commandHistory.length - 1 - newIndex],
          },
        } as ChangeEvent<HTMLInputElement>);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        onInputChange({
          target: { value: "" },
        } as ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <div className="flex items-center border border-green-500 p-6 rounded-sm relative bg-black bg-opacity-20">
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>
      <span className="text-green-500 mr-2 font-mono font-bold">{">"}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-green-500 placeholder:text-green-500 outline-none font-mono text-sm md:text-base"
        placeholder="ENTER COMMAND..."
        autoFocus
      />
    </div>
  );
}
