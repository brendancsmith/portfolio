import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brendan C. Smith | Lead Data Scientist",
  description:
    "Data scientist and engineer at the intersection of machine learning, cloud infrastructure, and scalable data systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
