import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import FooterSection from "@/components/layout/footer";
import CopyRight from "@/components/layout/copyRight";
import React from "react";
import FooterWrapper from "@/components/layout/FooterWrapper";
import { CompareProvider } from "@/contexts/CompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Milke Khareedo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CompareProvider>
          <Header />
          {children}
          <FooterWrapper />
        </CompareProvider>
      </body>
    </html>
  );
}
