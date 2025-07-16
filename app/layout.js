import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import MainContent from "../components/Main/MainContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "AI Resume Reviewer",
  description: "AI Resume Reviewer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <MainContent>
          {children}
        </MainContent>
      </body>
    </html>
  );
}
