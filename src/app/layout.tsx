import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "./components/Nav";
import "./globals.css";

const roobert = localFont({
  src: [
    {
      path: "./assets/fonts/RoobertTRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/RoobertTRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },

    {
      path: "./assets/fonts/RoobertTRIAL-Bold.woff2",
      weight: "700",
      style: "normal",
    },

    {
      path: "./assets/fonts/RoobertTRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },

    {
      path: "./assets/fonts/RoobertTRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Skinstric",
  description: "Your AI Skin Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roobert.className} antialiased text-[#1A1B1C] `}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
