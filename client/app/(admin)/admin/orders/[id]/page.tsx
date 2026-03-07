"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Container from "@/components/ui/Container"

export default function OrderDetailsPage() {

    const params = useParams()
    const { id } = params

    const [order, setOrder] = useState<any>(null)

    useEffect(() => {

        fetch(`http://localhost:5000/api/orders/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))

    }, [id])

    if (!order) return <p>Loading...</p>

    const updateStatus = async (status: string) => {

        await fetch(
            `http://localhost:5000/api/orders/${id}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            }
        )

        location.reload()
    }

    return (

        <Container>

            <div className="py-12">

                <h1 className="text-3xl font-bold mb-6">
                    Order #{order.order.id}
                </h1>

                <p><b>Customer:</b> {order.order.customer_name}</p>
                <p><b>Email:</b> {order.order.email}</p>
                <p><b>Phone:</b> {order.order.phone}</p>
                <p><b>Address:</b> {order.order.address}</p>
                <p><b>Status:</b> {order.order.status}</p>

                <div className="mt-6">

                    <select
                        onChange={(e) => updateStatus(e.target.value)}
                        className="border p-2"
                        defaultValue={order.order.status}
                    >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>

                </div>

                <h2 className="text-xl font-bold mt-8">
                    Products
                </h2>

                <ul className="mt-4 space-y-2">

                    {order.items.map((item: any) => (
                        <li key={item.id}>

                            {item.name} — Rs {item.price} × {item.quantity}

                        </li>
                    ))}

                </ul>

            </div>

        </Container>

    )
}