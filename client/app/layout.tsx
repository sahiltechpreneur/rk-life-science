import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "R. K. Life Science",
  description: "Wholesale distributor for nutraceutical products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
        {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
