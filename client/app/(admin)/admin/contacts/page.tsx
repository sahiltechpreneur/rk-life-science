"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { useNotification } from "@/context/NotificationContext"
import { FiSearch, FiMail, FiMessageSquare, FiCalendar, FiCheckCircle, FiTrash2, FiClock } from "react-icons/fi"

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { showNotification } = useNotification()

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        setIsLoading(true)
        try {
            const res = await API.get(`/contact/all`)
            setContacts(res.data)
        } catch (error) {
            console.error("Failed to fetch contacts", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleStatusUpdate = async (id: number, currentStatus: string) => {
        const newStatus = currentStatus === 'unseen' ? 'seen' : 'unseen'
        try {
            await API.put(`/contact/${id}/status`, { status: newStatus })
            showNotification(`Message marked as ${newStatus}`, "success")
            fetchContacts()
        } catch (error) {
            showNotification("Failed to update status", "error")
        }
    }

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(search.toLowerCase()) || 
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.feedback.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <FiMessageSquare className="w-5 h-5 text-emerald-600" />
                    <h1 className="text-xl font-semibold text-gray-800">Inquiries</h1>
                </div>
                <p className="text-sm text-gray-500">Manage customer messages and feedback</p>
            </div>

            {/* Search */}
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                    placeholder="Search by name, email or message..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                />
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-5 py-3">Customer</th>
                                <th className="px-5 py-3">Message</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Received</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                                                <div className="h-4 bg-gray-100 rounded w-24"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                                        <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded-full w-16"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                                    </tr>
                                ))
                            ) : filteredContacts.length > 0 ? (
                                filteredContacts.map((contact: any) => (
                                    <tr key={contact.id} className={`hover:bg-gray-50 transition-colors ${contact.status === 'unseen' ? 'bg-emerald-50/20' : ''}`}>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-medium">
                                                    {contact.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800 text-sm">
                                                        {contact.name}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                                        <FiMail className="w-3 h-3" />
                                                        <span>{contact.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-gray-600 max-w-xs truncate" title={contact.feedback}>
                                                {contact.feedback}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                                                contact.status === 'seen' 
                                                ? 'bg-gray-100 text-gray-500' 
                                                : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FiCalendar className="w-3 h-3 text-gray-400" />
                                                {new Date(contact.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button 
                                                onClick={() => handleStatusUpdate(contact.id, contact.status)}
                                                className={`p-1.5 rounded-lg transition-colors ${
                                                    contact.status === 'seen' 
                                                    ? 'text-gray-400 hover:bg-gray-100' 
                                                    : 'text-emerald-600 hover:bg-emerald-50'
                                                }`}
                                                title={contact.status === 'seen' ? "Mark as unseen" : "Mark as seen"}
                                            >
                                                {contact.status === 'seen' ? <FiClock className="w-4 h-4" /> : <FiCheckCircle className="w-4 h-4" />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <FiMessageSquare className="w-5 h-5 text-gray-300" />
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {search ? "No matching inquiries found" : "No customer messages received yet"}
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
