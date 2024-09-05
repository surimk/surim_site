import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surim Kim",
  description: "Surim Kim's Portfolio Website",
};

/**
 * The root layout component.
 *
 * This component is the top-level component that wraps all pages. It is
 * responsible for rendering the `<html>` element and its children, including the
 * `<head>` and `<body>` elements.
 *
 * This component is also responsible for applying the global CSS styles, as
 * specified in `globals.css`.
 *
 * @param {{ children: React.ReactNode }} props The props object.
 * @param {React.ReactNode} props.children The children of the component.
 * @returns {JSX.Element} The component element.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
