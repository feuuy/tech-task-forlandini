import { Work_Sans, Open_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import Navbar from "@/components/Navbar";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Tech Task - Felicio Orlandini",
  description: "Synonym Add & Search Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${openSans.variable} antialiased bg-white dark:bg-black text-black dark:text-white`}
      >
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
