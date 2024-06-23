import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

import { Toaster } from "sonner";
import { ConvexClientProvider } from "./providers/convex-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canban",
  description: "Canban project management",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster/>
              {children}
            </ThemeProvider>

          </ConvexClientProvider>
      </body>
    </html>
  );
}
