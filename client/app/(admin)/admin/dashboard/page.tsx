"use client"

import { useEffect, useState } from "react"
import Container from "@/components/ui/Container"
import RevenueChart from "@/components/admin/RevenueChart"

type Order = {
    id: number
    customer_name: string
    total: number
    status: string
}

export default function DashboardPage() {

    const [stats, setStats] = useState<any>(null)

    useEffect(() => {

        fetch("http://localhost:5000/api/dashboard")
            .then(res => res.json())
            .then(data => setStats(data))

    }, [])

    if (!stats) return <p>Loading...</p>

    return (

        <Container>

            <div className="py-12">

                <h1 className="text-3xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                {/* Stats cards */}

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-6 bg-green-100 rounded">
                        <h3 className="text-lg font-bold">Revenue</h3>
                        <p className="text-2xl font-bold">
                            Rs {stats.totalRevenue}
                        </p>
                    </div>

                    <div className="p-6 bg-blue-100 rounded">
                        <h3 className="text-lg font-bold">Orders</h3>
                        <p className="text-2xl font-bold">
                            {stats.totalOrders}
                        </p>
                    </div>

                    <div className="p-6 bg-yellow-100 rounded">
                        <h3 className="text-lg font-bold">Products</h3>
                        <p className="text-2xl font-bold">
                            {stats.totalProducts}
                        </p>
                    </div>

                </div>

                {/* Chart */}

                <div className="mt-10">
                    <RevenueChart />
                </div>

                {/* Recent Orders */}

                <div className="mt-10">

                    <h2 className="text-xl font-bold mb-4">
                        Recent Orders
                    </h2>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3 border">Order</th>
                                <th className="p-3 border">Customer</th>
                                <th className="p-3 border">Total</th>
                                <th className="p-3 border">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {stats.recentOrders.map((o: Order) => (
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

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </Container>

    )

}