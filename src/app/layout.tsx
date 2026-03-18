import type { Metadata } from "next";
import { Asap, Geist_Mono } from "next/font/google";
import "./globals.css";

const asap = Asap({
  variable: "--font-asap",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sikhs In The City",
  description:
    "A community-led running charity based in East London, bringing people and cultures together through running.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${asap.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
