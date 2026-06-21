import dns from "dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Geist, Geist_Mono, Hanken_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata = {
  title: "Medicare Connect",
  description: "Medicare Connect is a modern hospital appointment & healthcare management platform that connects patients with doctors and hospitals through a centralized online system.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // style={{ colorScheme: "light" }}
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
