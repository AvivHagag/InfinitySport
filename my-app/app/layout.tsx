import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/Navbar";
import Providers from "./Providers";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "./theme-provider";
import Footer from "./footer/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfinitySport",
  description: "InfinitySport",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Navbar />
            <main className="flex flex-col w-full text-xl">
              <div className="flex-grow">{children}</div>
            </main>
            <Toaster />
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
