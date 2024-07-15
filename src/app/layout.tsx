import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import siteMetadata from "../utils/siteMetaData";
import { cx } from "../utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: ["/logo.ico?v=4"],
    apple: ["/logo.ico?v=4"],
    shortcut: ["/logo.ico"],
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: "website",
    url: siteMetadata.siteUrl,
    images: [
      {
        url: "/path/to/your/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0b7555" />
      </head>
      <body className={cx("font-EuclidCircularB", "font-mr")}>{children}</body>
    </html>
  );
}
