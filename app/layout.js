import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import PageShell from "@/components/PageShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sahayak",
  description: "Helping hands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans min-h-screen bg-[#F4F7F5] text-[#1A1A1A] antialiased overflow-x-hidden`}
      >
        <SessionWrapper>
          <PageShell>
            <Navbar />
            {children}
            <Footer />
          </PageShell>
        </SessionWrapper>
      </body>
    </html>
  );
}
