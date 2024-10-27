import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/providers/theme";
import Query from "@/providers/query";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Light.woff",
      weight: "300",
    },
    {
      path: "./fonts/Satoshi-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/Satoshi-Medium.woff",
      weight: "500",
    },
    {
      path: "./fonts/Satoshi-Bold.woff",
      weight: "700",
    },
    {
      path: "./fonts/Satoshi-Black.woff",
      weight: "900",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/logo-white.png", media: "(prefers-color-scheme: dark)" },
      { url: "/logo-black.png", media: "(prefers-color-scheme: light)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={satoshi.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Query>
              <main className="min-h-screen">{children}</main>
            </Query>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
