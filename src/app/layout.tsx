import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SettingsPasscode } from "@/components/SettingsPasscode";

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
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold text-lg">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">
                60
              </span>
              <span className="whitespace-nowrap">
                Minute<span className="text-brand">2</span>WinIt
              </span>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/surprise"
                className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand dark:border-white/10"
              >
                🎲 <span className="hidden sm:inline">Surprise Me</span>
              </Link>
              <SettingsPasscode />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 py-8 text-center text-sm text-foreground/60 dark:border-white/10">
          Minute 2 Win It — another project by{" "}
          <a
            href="https://cikgutawfiq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand hover:underline"
          >
            CikguTawfiq
          </a>
        </footer>
      </body>
    </html>
  );
}
