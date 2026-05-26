import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Powersports Competitive Dashboard",
  description: "Enterprise competitive dashboard for ATV, UTV and SSV products"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
