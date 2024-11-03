import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import StarryBackground from '@/components/background/StarryBackground';
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Thaicn",
  description: "Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <StarryBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
