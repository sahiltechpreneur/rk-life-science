"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Container from "@/components/ui/Container"

type Order = {
    id: number
    customer_name: string
    total: number
    status: string
    created_at: string
}

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {

        fetch("http://localhost:5000/api/orders")
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [])

    return (

        <Container>

            <div className="py-12">

                <h1 className="text-3xl font-bold mb-6">
                    Orders
                </h1>

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3 border">Order ID</th>
                            <th className="p-3 border">Customer</th>
                            <th className="p-3 border">Total</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map(o => (
                            <tr key={o.id}>

                                <td className="p-3 border">#{o.id}</td>

                                <td className="p-3 border">
                                    {o.customer_name}
                                </td>

                                <td className="p-3 border">
                                    Rs {o.total}
                                </td>

                                <td className="p-3 border">
                                    {o.status}
                                </td>

                                <td className="p-3 border">

                                    <Link
                                        href={`/admin/orders/${o.id}`}
                                        className="text-blue-600"
                                    >
                                        View
                                    </Link>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </Container>

    )
}