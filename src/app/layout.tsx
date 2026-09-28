import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minute2WinIt — Team Building Activity Database",
  description:
    "Search, filter and sort hundreds of team-building games, icebreakers and Minute to Win It challenges — complete with rules and how-to-play instructions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">
                60
              </span>
              Minute<span className="text-brand">2</span>WinIt
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-brand transition-colors">
                Browse Activities
              </Link>
              <a
                href="https://docs.google.com/spreadsheets/d/1UkN4n1v6IHoGkidwiCRqTFo6d-ISwpKBu5XfKB1k7TI/edit?gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline hover:text-brand transition-colors"
              >
                Edit Database
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 py-8 text-center text-sm text-foreground/60 dark:border-white/10">
          Minute2WinIt — data sourced from a shared Google Sheet, editable by
          the team.
        </footer>
      </body>
    </html>
  );
}
