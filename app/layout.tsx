import type { Metadata } from "next";
import localFont from "next/font/local";
import { Hanken_Grotesk, JetBrains_Mono, Inter } from "next/font/google";

import "@/app/globals.css";

import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CheckCircle2Icon } from "lucide-react";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const liberationSerif = localFont({
  src: [
    {
      path: "../public/fonts/liberation_serif/LiberationSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/liberation_serif/LiberationSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/liberation_serif/LiberationSerif-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/liberation_serif/LiberationSerif-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-liberation-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DoxieAI",
  description: "Next.js frontend for the Doxie Laravel API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${hankenGrotesk.variable} ${liberationSerif.variable} ${jetBrainsMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="var(--brand)"
          height={3}
          shadow="0 0 10px var(--brand), 0 0 5px var(--brand)"
          showSpinner={false}
          crawlSpeed={200}
          speed={300}
        />
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          position="top-right"
          duration={3000}
          closeButton={true}
          icons={{ success: <CheckCircle2Icon className="size-4" /> }}
        />
      </body>
    </html>
  );
}
