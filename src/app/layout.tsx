import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emma DaSilva | Cybersécurité & Développement Web",
  description: "Portfolio d’Emma DaSilva, développeuse web junior passionnée par la cybersécurité.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
