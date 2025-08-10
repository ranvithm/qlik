import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qlik TypeScript SDK",
    template: "%s | Qlik TypeScript SDK"
  },
  description: "The official TypeScript SDK for seamless integration with Qlik Sense Enterprise and Qlik Cloud. Build powerful analytics applications with type-safe APIs.",
  keywords: ["Qlik", "TypeScript", "SDK", "Analytics", "Data Visualization", "Qlik Sense", "Qlik Cloud"],
  authors: [{ name: "Qlik" }],
  creator: "Qlik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qlik-sdk-docs.vercel.app",
    title: "Qlik TypeScript SDK",
    description: "The official TypeScript SDK for Qlik Sense Enterprise and Qlik Cloud integration",
    siteName: "Qlik TypeScript SDK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qlik TypeScript SDK",
    description: "Build powerful analytics applications with type-safe APIs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t relative bg-muted z-30 transition-colors duration-300">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with{" "}
                  <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    Next.js
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    Tailwind CSS
                  </a>
                  .
                </p>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-left">
                © 2024 Qlik SDK Documentation. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
