import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/components/providers/StoreProvider"; 
import AuthProvider from "@/components/providers/AuthProvider"; 
import Header from "@/components/ui/Header"; 
import ToastProvider from "@/components/ui/ToastProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextStore",
  description: "E-commerce app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <ToastProvider />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}