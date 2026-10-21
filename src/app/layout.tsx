import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Emma DaSilva | Cybersécurité & Développement Web",
  description: "Portfolio d’Emma DaSilva, développeuse web junior passionnée par la cybersécurité.",
};

export const viewport: Viewport = { themeColor: "#0a121a", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>;
}
