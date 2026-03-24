import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "R. K. Life Science",
  description: "Wholesale distributor for nutraceutical products",
};

import { SocketProvider } from "@/context/SocketContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <CartProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
