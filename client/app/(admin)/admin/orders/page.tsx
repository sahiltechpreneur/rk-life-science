"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FiSearch, FiFileText, FiDownload, FiEye, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiPackage } from "react-icons/fi"
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
        try {
            const res = await fetch("http://localhost:5000/api/orders")
            const data = await res.json()
            setOrders(data)
        } catch (error) {
            console.error("Failed to fetch orders", error)
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
            case 'pending': return <FiClock className="w-4 h-4" />
            case 'processing': return <FiPackage className="w-4 h-4" />
            case 'shipped': return <FiTruck className="w-4 h-4" />
            case 'delivered': return <FiCheckCircle className="w-4 h-4" />
            case 'cancelled': return <FiXCircle className="w-4 h-4" />
            default: return <FiClock className="w-4 h-4" />
        }
    }

    const getStatusStyle = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200'
            case 'processing': return 'bg-blue-50 text-blue-600 border-blue-200'
            case 'shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-200'
            case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-200'
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-200'
            default: return 'bg-gray-50 text-gray-600 border-gray-200'
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
        
        doc.setFontSize(20)
        doc.text("RK Life Science - Orders Report", 14, 22)
        doc.setFontSize(11)
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

        const tableColumn = ["Order ID", "Customer Name", "Total (NPR)", "Date", "Status"]
        const tableRows = filteredOrders.map(o => [
            `#${o.id}`,
            o.customer_name,
            o.total,
            new Date(o.created_at).toLocaleDateString(),
            o.status
        ])

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 5 },
            headStyles: { fillColor: [15, 23, 42], textColor: 255, halign: 'center' },
            columnStyles: {
                0: { halign: 'center' },
                2: { halign: 'right' },
                3: { halign: 'center' },
                4: { halign: 'center' }
            }
        })

        doc.save("RK_Life_Science_Orders.pdf")
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[85vh] bg-transparent">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900">
                        Order
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 ml-2">
                            Management
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm font-medium">Track and export customer orders</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={exportExcel}
                        className="group relative inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm"
                    >
                        <FiFileText className="w-4 h-4 mr-2 text-emerald-600" />
                        Export Excel
                    </button>
                    <button 
                        onClick={exportPDF}
                        className="group relative inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <FiDownload className="w-4 h-4 mr-2" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-1 border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                    <FiSearch className="text-gray-400 w-5 h-5" />
                    <input 
                        placeholder="Search orders by ID or customer name..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 px-3 py-2 text-sm sm:text-base outline-none" 
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">From:</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">To:</label>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <button 
                            onClick={() => { setStartDate(""); setEndDate(""); }}
                            className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 px-3 py-2.5 rounded-xl ml-1"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Total</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                                <div className="h-4 bg-gray-100 rounded w-32"></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-20 ml-auto"></div></td>
                                        <td className="px-6 py-5"><div className="h-6 bg-gray-100 rounded-full w-24"></div></td>
                                        <td className="px-6 py-5"><div className="h-8 bg-gray-100 rounded-lg w-20 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map((o: Order) => (
                                    <tr key={o.id} className="hover:bg-amber-50/20 transition-colors group">
                                        <td className="px-6 py-5">
                                            <span className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">#{o.id}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {o.customer_name.charAt(0)}
                                                </div>
                                                <span className="font-semibold text-gray-800">{o.customer_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                                            {new Date(o.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-5 text-right font-black text-gray-900">
                                            NPR {o.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(o.status)}`}>
                                                {getStatusIcon(o.status)}
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link 
                                                href={`/admin/orders/${o.id}`}
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
                                            >
                                                <FiEye className="w-4 h-4 mr-2 text-gray-400" />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                                                <FiSearch className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                                            <p className="text-gray-500 max-w-sm">
                                                {search ? "We couldn't find any orders matching your search." : "You haven't received any orders yet."}
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