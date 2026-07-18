import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Orbitron, Rajdhani,Inter,Oxanium } from 'next/font/google';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-orbitron',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const oxanium = Oxanium({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oxanium',
});
export const metadata: Metadata = {
  title: "Nexus",
  description: "Gaming store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${orbitron.variable}`}>
        {children}
      </body>
    </html>
  );
}