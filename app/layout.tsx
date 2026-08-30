import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/src/components/layout/AppShell";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: "CAIE Study Hub",
    template: "%s · CAIE Study Hub",
  },
  description:
    "Focused CAIE A-Level revision notes, progress tracking and past-paper metadata for Mathematics 9709, Computer Science 9618, Business 9609 and Chemistry 9701.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
