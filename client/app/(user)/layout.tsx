import Footer from "@/components/user/Footer"
import Navbar from "@/components/user/Navbar"
import { CartProvider } from "@/context/CartContext"


export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />

            <main className="flex-grow">
                <CartProvider>
                    {children}
                </CartProvider>
            </main>

            <Footer />

        </div>
    )
}