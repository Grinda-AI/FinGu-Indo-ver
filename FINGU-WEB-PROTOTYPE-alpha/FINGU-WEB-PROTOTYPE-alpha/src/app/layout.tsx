import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fingu Web Prototype",
  description: "A prototype for the magnificent Fingu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-base-100 text-base-content fixed inset-0`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
