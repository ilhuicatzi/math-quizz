import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import SessionContexProvider from "@/contexts/SessionProvider";
import "./globals.css";
import 'katex/dist/katex.min.css';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Math Quizz | Reinforce and validate your knowledge in mathematics",
  description: "A quiz app to reinforce your basic knowledge in mathematics such as arithmetic and algebra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased text-text-primary dark:text-text-primary dark:bg-background",
          fontSans.variable
        )}
      >
        <SessionContexProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
        </SessionContexProvider>
      </body>
    </html>
  );
}
