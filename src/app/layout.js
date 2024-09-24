// Importing Google fonts and ThemeProvider for dark mode support
import { Work_Sans, Open_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

// Global styles and Navbar component
import "./globals.css";
import Navbar from "@/components/Navbar";

// Loading fonts with CSS variables
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// Metadata for the app (title and description)
export const metadata = {
  title: "Tech Task - Felicio Orlandini",
  description: "Synonym Add & Search Tool",
};

// Root layout component, wrapping content in ThemeProvider for dark mode
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Applying fonts and setting up dark/light theme */}
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
