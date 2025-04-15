"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function BootSequence() {
  const [bootStage, setBootStage] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bootText, setBootText] = useState<string[]>([]);

  const bootSequenceText = [
    "INITIALIZING SYSTEM...",
    "LOADING KERNEL...",
    "CHECKING HARDWARE INTEGRITY...",
    "ESTABLISHING NETWORK CONNECTION...",
    "BYPASSING SECURITY PROTOCOLS...",
    "ACCESSING CLASSIFIED DATABASES...",
    "INITIALIZING QUANTUM ENCRYPTION...",
    "LOADING NEURAL INTERFACE...",
    "ACTIVATING WARFRAME AI CORE...",
    "SYSTEM READY.",
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (bootStage < bootSequenceText.length) {
      timer = setTimeout(() => {
        setBootText((prev) => [...prev, bootSequenceText[bootStage]]);
        setBootStage((prev) => prev + 1);
      }, Math.random() * 300 + 200);
    }

    return () => clearTimeout(timer);
  }, [bootStage]);

  useEffect(() => {
    let loadingTimer: NodeJS.Timeout;

    if (loadingProgress < 100) {
      loadingTimer = setTimeout(() => {
        setLoadingProgress((prev) => {
          const increment = Math.floor(Math.random() * 5) + 1;
          return Math.min(prev + increment, 100);
        });
      }, Math.random() * 100 + 50);
    }

    return () => clearTimeout(loadingTimer);
  }, [loadingProgress]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-green-500 font-mono relative my-auto p-4">
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>

      <div className="w-full max-w-2xl bg-black bg-opacity-70 p-6 rounded-sm border border-green-500 relative z-10">
        <pre className="text-green-500 text-xs sm:text-sm leading-tight mb-8 glitch">
          {`
 █     █░ ▄▄▄       ██▀███    █████▒██▀███   ▄▄▄       ███▄ ▄███▓▓█████
▓█░ █ ░█░▒████▄    ▓██ ▒ ██▒▓██   ▒▓██ ▒ ██▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀
▒█░ █ ░█ ▒██  ▀█▄  ▓██ ░▄█ ▒▒████ ░▓██ ░▄█ ▒▒██  ▀█▄  ▓██    ▓██░▒███
░█░ █ ░█ ░██▄▄▄▄██ ▒██▀▀█▄  ░▓█▒  ░▒██▀▀█▄  ░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄
░░██▒██▓  ▓█   ▓██▒░██▓ ▒██▒░▒█░   ░██▓ ▒██▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒
░ ▓░▒ ▒   ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ▒ ░   ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░
  ▒ ░ ░    ▒   ▒▒ ░  ░▒ ░ ▒░ ░       ░▒ ░ ▒░  ▒   ▒▒ ░░  ░      ░ ░ ░  ░
  ░   ░    ░   ▒     ░░   ░  ░ ░     ░░   ░   ░   ▒   ░      ░      ░
    ░          ░  ░   ░               ░           ░  ░       ░      ░  ░
`}
        </pre>

        <div className="mb-6 text-center">
          <div className="text-xl font-bold mb-2">
            ADVANCED INTELLIGENCE SYSTEM
          </div>
          <div className="text-sm opacity-70">
            GOVERNMENT CLASSIFIED - TOP SECRET
          </div>
        </div>

        <div className="mb-6">
          {bootText.map((text, index) => (
            <div
              key={index}
              className={cn("mb-1", index === bootText.length - 1 && "blink")}
            >
              {text}
              {index === bootText.length - 1 &&
                text !== "SYSTEM READY." &&
                "..."}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>LOADING SYSTEM</span>
            <span>{loadingProgress}%</span>
          </div>
          <div className="w-full bg-black border border-green-500">
            <div
              className="bg-green-500 h-2 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="text-xs opacity-70 mt-8">
          <div>WARFRAME ADVANCED INTELLIGENCE SYSTEM v3.7.2</div>
          <div>© 2025 CLASSIFIED RESEARCH DIVISION</div>
          <div className="mt-2 text-yellow-500">
            WARNING: UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE
          </div>
        </div>
      </div>
    </div>
  );
}
