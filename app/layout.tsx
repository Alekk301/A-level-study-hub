import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/src/components/layout/AppShell";
import { Providers } from "@/app/providers";

const googleAnalyticsId = "G-006M2N3KNY";

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
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
