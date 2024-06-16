
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";



import { Toaster } from "sonner";
import { ConvexClientProvider } from "./providers/convex-client-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canban",
  description: "Canban project managment",
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
            <Toaster/>
            {children}
          </ConvexClientProvider>
      </body>
    </html>
  );
}
