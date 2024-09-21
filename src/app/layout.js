import "./globals.css";
import { Oswald, Roboto } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Tech Task FOrlandini",
  description: "Synonym Add & Search Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
