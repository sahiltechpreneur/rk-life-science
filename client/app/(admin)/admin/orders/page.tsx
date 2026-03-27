"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FiSearch, FiFileText, FiDownload, FiEye, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiPackage, FiCalendar } from "react-icons/fi"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useSocket } from "@/context/SocketContext"

type Order = {
    id: number
    customer_name: string
    total: number
    status: string
    created_at: string
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [search, setSearch] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { socket } = useSocket()

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.on('new_order', fetchOrders)
        socket.on('order_status_updated', fetchOrders)
        return () => {
            socket.off('new_order', fetchOrders)
            socket.off('order_status_updated', fetchOrders)
        }
    }, [socket])

    const fetchOrders = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
            const data = await res.json()
            if (Array.isArray(data)) {
                setOrders(data)
            } else {
                setError(data.error || "Failed to fetch orders")
            }
        } catch (error) {
            console.error("Failed to fetch orders", error)
            setError("Network error. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search)
        
        let matchesDate = true
        const orderDate = new Date(o.created_at)
        
        if (startDate) {
            const start = new Date(startDate)
            start.setHours(0, 0, 0, 0)
            if (orderDate < start) matchesDate = false
        }
        
        if (endDate) {
            const end = new Date(endDate)
            end.setHours(23, 59, 59, 999)
            if (orderDate > end) matchesDate = false
        }
        
        return matchesSearch && matchesDate
    })

    const getStatusIcon = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return <FiClock className="w-3.5 h-3.5" />
            case 'processing': return <FiPackage className="w-3.5 h-3.5" />
            case 'shipped': return <FiTruck className="w-3.5 h-3.5" />
            case 'delivered': return <FiCheckCircle className="w-3.5 h-3.5" />
            case 'cancelled': return <FiXCircle className="w-3.5 h-3.5" />
            default: return <FiClock className="w-3.5 h-3.5" />
        }
    }

    const getStatusStyle = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return 'bg-amber-50 text-amber-600'
            case 'processing': return 'bg-blue-50 text-blue-600'
            case 'shipped': return 'bg-indigo-50 text-indigo-600'
            case 'delivered': return 'bg-emerald-50 text-emerald-600'
            case 'cancelled': return 'bg-red-50 text-red-600'
            default: return 'bg-gray-50 text-gray-600'
        }
    }

    // Export to Excel
    const exportExcel = () => {
        const dataToExport = filteredOrders.map(o => ({
            "Order ID": o.id,
            "Customer Name": o.customer_name,
            "Total Amount (NPR)": o.total,
            "Date": new Date(o.created_at).toLocaleDateString(),
            "Status": o.status
        }))
        
        const worksheet = XLSX.utils.json_to_sheet(dataToExport)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders")
        XLSX.writeFile(workbook, "RK_Life_Science_Orders.xlsx")
    }

    // Export to PDF
    const exportPDF = () => {
        const doc = new jsPDF()
        
        doc.setFontSize(18)
        doc.text("RK Life Science - Orders Report", 14, 22)
        doc.setFontSize(10)
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30)

        const tableColumn = ["Order ID", "Customer", "Total (NPR)", "Date", "Status"]
        const tableRows = filteredOrders.map(o => [
            `#${o.id}`,
            o.customer_name,
            o.total.toLocaleString(),
            new Date(o.created_at).toLocaleDateString(),
            o.status
        ])

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 38,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 4 },
            headStyles: { fillColor: [16, 185, 129], textColor: 255, halign: 'center' },
            columnStyles: {
                0: { halign: 'center' },
                2: { halign: 'right' }
            }
        })

        doc.save("RK_Life_Science_Orders.pdf")
    }

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <FiPackage className="w-5 h-5 text-emerald-600" />
                    <h1 className="text-xl font-semibold text-gray-800">Orders</h1>
                </div>
                <p className="text-sm text-gray-500">Manage and track customer orders</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        placeholder="Search by order ID or customer..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                    />
                </div>
                
                <div className="flex gap-2">
                    <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>
                    <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <button 
                            onClick={() => { setStartDate(""); setEndDate(""); }}
                            className="px-3 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={exportExcel}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <FiFileText className="w-4 h-4 text-emerald-600" />
                        Excel
                    </button>
                    <button 
                        onClick={exportPDF}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        <FiDownload className="w-4 h-4" />
                        PDF
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={fetchOrders} className="text-xs font-medium underline">Retry</button>
                </div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-5 py-3">Order ID</th>
                                <th className="px-5 py-3">Customer</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3 text-right">Total</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-12"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-28"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-16 ml-auto"></div></td>
                                        <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded-full w-16"></div></td>
                                        <td className="px-5 py-4"><div className="h-7 bg-gray-100 rounded w-14 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map((o: Order) => (
                                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 font-medium text-gray-800">#{o.id}</td>
                                        <td className="px-5 py-4 text-gray-700">{o.customer_name}</td>
                                        <td className="px-5 py-4 text-gray-500 text-xs">
                                            {new Date(o.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-4 text-right font-medium text-gray-800">
                                            NPR {o.total.toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${getStatusStyle(o.status)}`}>
                                                {getStatusIcon(o.status)}
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Link 
                                                href={`/admin/orders/${o.id}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-gray-600 hover:text-emerald-600 transition-colors"
                                            >
                                                <FiEye className="w-3.5 h-3.5" />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <FiPackage className="w-5 h-5 text-gray-300" />
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {search || startDate || endDate ? "No orders match your filters" : "No orders yet"}
                                            </p>
                                        </div>
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