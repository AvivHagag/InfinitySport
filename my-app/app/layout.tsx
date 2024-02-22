import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/Navbar";
import Providers from "./navbar/Providers";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "./theme-provider";
import Footer from "./footer/Footer";

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
  console.log(session);
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <main className="flex flex-col w-full text-xl">
              <Navbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
