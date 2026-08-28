import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Long Arc Songs | Independent Songwriters",
  description: "Long Arc Songs is a UK songwriting partnership creating melodic, emotionally direct songs across pop, country, soul, folk, big band and adult contemporary music.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
