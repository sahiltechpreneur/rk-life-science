"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { FiSearch, FiMail, FiCalendar, FiUsers, FiDownload } from "react-icons/fi"

export default function AdminNewslettersPage() {
    const [subscribers, setSubscribers] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchSubscribers()
    }, [])

    const fetchSubscribers = async () => {
        setIsLoading(true)
        try {
            const res = await API.get(`/newsletter/subscribers`)
            setSubscribers(res.data)
        } catch (error) {
            console.error("Failed to fetch subscribers", error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredSubscribers = subscribers.filter(sub => 
        sub.email.toLowerCase().includes(search.toLowerCase())
    )

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Email,Subscribed At\n"
            + subscribers.map(sub => `${sub.email},${sub.created_at}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "newsletter_subscribers.csv");
        document.body.appendChild(link);
        link.click();
    }

    return (
        <div className="space-y-5">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <FiMail className="w-5 h-5 text-emerald-600" />
                        <h1 className="text-xl font-semibold text-gray-800">Newsletter Subscribers</h1>
                    </div>
                    <p className="text-sm text-gray-500">Manage your marketing email list</p>
                </div>
                
                <button 
                    onClick={downloadCSV}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                >
                    <FiDownload className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                    placeholder="Search subscribers by email..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                />
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-5 py-3">Subscriber Email</th>
                                <th className="px-5 py-3">Joined Date</th>
                                <th className="px-5 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"></div>
                                                <div className="h-4 bg-gray-100 rounded w-48"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                                        <td className="px-5 py-4 text-right"><div className="h-5 bg-gray-100 rounded-full w-16 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredSubscribers.length > 0 ? (
                                filteredSubscribers.map((subscriber: any) => (
                                    <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-medium">
                                                    @
                                                </div>
                                                <div className="font-medium text-gray-800 text-sm">
                                                    {subscriber.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FiCalendar className="w-3 h-3 text-gray-400" />
                                                {new Date(subscriber.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <span className="inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                Subscribed
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <FiUsers className="w-5 h-5 text-gray-300" />
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {search ? "No matching subscribers found" : "No newsletter subscribers yet"}
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
