import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WARFRAME",
  description: "Created by Alex Hughes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
