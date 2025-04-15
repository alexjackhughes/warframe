"use client";

import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Lock } from "lucide-react";

export function TerminalHeader() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [securityLevel, setSecurityLevel] = useState("ALPHA");
  const [encryptionStatus, setEncryptionStatus] = useState("ACTIVE");
  const [alertStatus, setAlertStatus] = useState("NONE");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDate(
        now
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-")
      );

      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Randomly change security statuses for effect
    const statusInterval = setInterval(() => {
      const secLevels = ["ALPHA", "BETA", "GAMMA", "DELTA", "EPSILON"];
      const encStatuses = ["ACTIVE", "ENHANCED", "QUANTUM", "NEURAL"];
      const alertStatuses = ["NONE", "LOW", "MEDIUM", "HIGH"];

      if (Math.random() > 0.7) {
        setSecurityLevel(
          secLevels[Math.floor(Math.random() * secLevels.length)]
        );
      }

      if (Math.random() > 0.8) {
        setEncryptionStatus(
          encStatuses[Math.floor(Math.random() * encStatuses.length)]
        );
      }

      if (Math.random() > 0.9) {
        setAlertStatus(
          alertStatuses[Math.floor(Math.random() * alertStatuses.length)]
        );
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="border border-green-500 p-2 rounded-sm mb-4 font-mono text-xs md:text-sm relative overflow-hidden bg-black bg-opacity-25">
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>

      {/* ASCII Art Header */}
      <pre className="text-green-500 text-xs leading-tight mb-2 glitch">
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

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-500">WARFRAME TERMINAL v3.7.2</span>
        </div>
        <div className="text-green-500 blink">
          {date} {time}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="flex items-center">
          <Lock className="h-3 w-3 text-green-500 mr-1" />
          <span className="text-yellow-500">SECURITY:</span>
          <span className="text-green-500 ml-1">LEVEL {securityLevel}</span>
        </div>

        <div className="flex items-center">
          <span className="text-yellow-500">ENCRYPTION:</span>
          <span className="text-green-500 ml-1">{encryptionStatus}</span>
        </div>

        <div className="flex items-center">
          <AlertTriangle
            className={cn(
              "h-3 w-3 mr-1",
              alertStatus === "NONE"
                ? "text-green-500"
                : alertStatus === "LOW"
                ? "text-yellow-500"
                : "text-red-500 animate-pulse"
            )}
          />
          <span className="text-yellow-500">ALERT:</span>
          <span
            className={cn(
              "ml-1",
              alertStatus === "NONE"
                ? "text-green-500"
                : alertStatus === "LOW"
                ? "text-yellow-500"
                : "text-red-500"
            )}
          >
            {alertStatus}
          </span>
        </div>
      </div>

      <div className="mt-1 text-xs text-green-500 opacity-70">
        AUTHORIZED ACCESS ONLY - ALL ACTIVITIES MONITORED AND RECORDED
      </div>
    </div>
  );
}
