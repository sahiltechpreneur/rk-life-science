import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { SocketProvider } from "@/context/SocketContext";

// Outfit — clean, modern, but still feels personal.
// Not over-engineered, just a solid font choice that reads well on any screen.
const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

// Site metadata — simple, honest. No fluff, just what matters.
export const metadata: Metadata = {
  title: "R. K. Life Science",
  description: "Wholesale distributor for nutraceutical products",
  // Adding a few human touches — helps with sharing, feels complete
  keywords: "nutraceuticals, wholesale, health supplements, wellness products",
  authors: [{ name: "R. K. Life Science" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        {/* 
          Providers are stacked in order of dependency:
          Auth first (needed for user context), then notifications (needs auth for user-specific alerts),
          cart (needs user), and finally socket (needs all of the above for real-time updates).
          This ordering isn't accidental — it's how the app actually works.
        */}
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <SocketProvider>
                {children}
              </SocketProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}