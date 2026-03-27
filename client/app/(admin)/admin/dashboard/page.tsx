"use client"

import { useEffect, useState } from "react"
import RevenueChart from "@/components/admin/RevenueChart"
import { FaMoneyBillWave, FaShoppingCart, FaBoxOpen, FaChartLine, FaSync } from "react-icons/fa"
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
    const [isLoading, setIsLoading] = useState(true)

    const fetchStats = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`);
            const data = await res.json();
            if (!res.ok) {
                setStats({ error: data.error || "Failed to fetch statistics" });
            } else {
                setStats(data);
            }
        } catch (err) {
            console.error("Error fetching dashboard stats", err);
            setStats({ error: "Network error. Please check your connection." });
        } finally {
            setIsLoading(false)
        }
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

    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading dashboard...</p>
            </div>
        </div>
    )

    if (stats?.error) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center max-w-md shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaChartLine className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Unable to load dashboard</h2>
                <p className="text-sm text-gray-500 mb-5">{stats.error}</p>
                <button 
                    onClick={fetchStats}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <FaSync className="w-3.5 h-3.5" />
                    Try again
                </button>
            </div>
        </div>
    )

    const chartLabels = stats?.weeklyRevenue?.map((m: any) => m.week) || []
    const chartData = stats?.weeklyRevenue?.map((m: any) => parseFloat(m.revenue)) || []

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div>
                <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Overview of your store's performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">NPR {stats?.totalRevenue?.toLocaleString() || '0'}</h3>
                        </div>
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <FaMoneyBillWave className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats?.totalOrders || 0}</h3>
                        </div>
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <FaShoppingCart className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Products</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats?.totalProducts || 0}</h3>
                        </div>
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                            <FaBoxOpen className="w-4 h-4 text-amber-600" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">Revenue Overview</h2>
                    <span className="text-[10px] text-gray-400">Last 6 weeks</span>
                </div>
                <div className="h-64 w-full">
                    {chartLabels.length > 0 ? (
                        <RevenueChart labels={chartLabels} dataset={chartData} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            No revenue data available
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-700">Recent Orders</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
                            <tr>
                                <th className="px-5 py-3">Order ID</th>
                                <th className="px-5 py-3">Customer</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Amount</th>
                                <th className="px-5 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((o: Order) => (
                                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-gray-700 text-xs">#{o.id}</td>
                                        <td className="px-5 py-3 text-gray-600 text-xs">{o.customer_name}</td>
                                        <td className="px-5 py-3 text-gray-400 text-xs">{o.created_at ? new Date(o.created_at).toLocaleDateString() : "N/A"}</td>
                                        <td className="px-5 py-3 font-medium text-gray-700 text-xs">NPR {o.total.toLocaleString()}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${
                                                o.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                                o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-gray-50 text-gray-500'
                                            }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center text-gray-400 text-sm">
                                        No recent orders
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