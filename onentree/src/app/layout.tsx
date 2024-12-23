import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";

const opensans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneTree - Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${opensans.className} antialiased`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
