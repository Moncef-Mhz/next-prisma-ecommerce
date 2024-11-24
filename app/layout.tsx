import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/lib/AuthProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "@/components/ui/toaster";
import LayoutProivder from "@/utils/LayoutProivder";
import { ThemeProvider } from "@/lib/theme-provider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "900"],
});

export const metadata: Metadata = {
  title: "Ecommerce Prisma",
  description: "Generated by create-next-app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <EdgeStoreProvider>
            <LayoutProivder>
              {children}
              <Toaster />
            </LayoutProivder>
          </EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
