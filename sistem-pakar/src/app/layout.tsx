import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VetExpert – Sistem Pakar Diagnosa Penyakit Kucing & Anjing",
  description:
    "Sistem pakar berbasis web untuk mendiagnosa penyakit awal pada kucing dan anjing menggunakan metode Certainty Factor.",
  keywords: ["sistem pakar", "diagnosa hewan", "kucing", "anjing", "certainty factor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
