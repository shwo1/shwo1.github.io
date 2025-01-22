import type { Metadata } from "next";
import { Chela_One } from "next/font/google";
import "./globals.css";

const chelaOne = Chela_One({
  subsets: ["latin"],
  weight: '400'
})

export const metadata: Metadata = {
  title: "MuQuiz",
  description: "A quiz game to guess music note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chelaOne.className} bg-amber-50`}
      >
        {children}
      </body>
    </html>
  );
}
