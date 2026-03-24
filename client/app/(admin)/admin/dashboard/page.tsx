"use client"

import { useEffect, useState } from "react"
import RevenueChart from "@/components/admin/RevenueChart"
import { FaMoneyBillWave, FaShoppingCart, FaBoxOpen } from "react-icons/fa"
import { useSocket } from "@/context/SocketContext"

type Order = {
    id: number
    customer_name: string
    total: number
    status: string
    created_at?: string
}

export default function DashboardPage() {

    const [stats, setStats] = useState<any>(null)

    const fetchStats = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching dashboard stats", err))
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const { socket } = useSocket()

    useEffect(() => {
        if (!socket) return
        socket.on('new_order', fetchStats)
        socket.on('order_status_updated', fetchStats)
        return () => {
            socket.off('new_order', fetchStats)
            socket.off('order_status_updated', fetchStats)
        }
    }, [socket])

    if (!stats) return (
        <div className="flex justify-center items-center h-[80vh] space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-primary rounded-full animation-delay-200"></div>
            <div className="w-3 h-3 bg-primary rounded-full animation-delay-400"></div>
        </div>
    )

    const chartLabels = stats.weeklyRevenue?.map((m: any) => m.week) || []
    const chartData = stats.weeklyRevenue?.map((m: any) => parseFloat(m.revenue)) || []

    return (
        <div className="space-y-8 max-w-7xl mx-auto">

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">Overview of your store's performance</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Revenue Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-gray-900">NPR {stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                        <FaShoppingCart />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Orders</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.totalOrders}</h3>
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-2xl">
                        <FaBoxOpen />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Products</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.totalProducts}</h3>
                    </div>
                </div>

            </div>

            {/* Chart Area */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Overview</h2>
                <div className="h-80 w-full mb-8">
                    {chartLabels.length > 0 ? (
                        <RevenueChart labels={chartLabels} dataset={chartData} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            No revenue data available for the last 6 weeks.
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentOrders && stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((o: Order) => (
                                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">#{o.id}</td>
                                        <td className="px-6 py-4">{o.customer_name}</td>
                                        <td className="px-6 py-4 text-gray-500">{o.created_at || "N/A"}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">NPR {o.total.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                o.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                o.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}