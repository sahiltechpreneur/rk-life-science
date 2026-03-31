"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { useNotification } from "@/context/NotificationContext"
import { FiSearch, FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiSlash, FiTrash2, FiCheckCircle, FiUsers } from "react-icons/fi"

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { showNotification } = useNotification()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const res = await API.get(`/auth/users`)
            setUsers(res.data)
        } catch (error) {
            console.error("Failed to fetch users", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBlock = async (id: number, isBlocked: boolean) => {
        if (!confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`)) return
        try {
            await API.put(`/auth/users/${id}/block`, { is_blocked: !isBlocked })
            showNotification(`User ${!isBlocked ? 'blocked' : 'unblocked'}`, "success")
            fetchUsers()
        } catch (error) {
            showNotification("Failed to update user status", "error")
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Permanently delete this user? This cannot be undone.")) return
        try {
            await API.delete(`/auth/users/${id}`)
            showNotification("User deleted", "success")
            fetchUsers()
        } catch (error) {
            showNotification("Failed to delete user", "error")
        }
    }

    const filteredUsers = users.filter(user => 
        user.fname.toLowerCase().includes(search.toLowerCase()) || 
        user.lname.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">
            
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <FiUsers className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl font-semibold text-slate-100">Customers</h1>
                </div>
                <p className="text-sm text-slate-400">Manage registered users and their accounts</p>
            </div>

            {/* Search */}
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    placeholder="Search by name or email..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-500" 
                />
            </div>

            {/* Users Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-800/50 text-slate-400 text-xs font-medium border-b border-slate-700">
                            <tr>
                                <th className="px-5 py-3">User</th>
                                <th className="px-5 py-3">Contact</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Joined</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-700/50 rounded-full"></div>
                                                <div className="h-4 bg-slate-700/50 rounded w-24"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4"><div className="h-4 bg-slate-700/50 rounded w-32"></div></td>
                                        <td className="px-5 py-4"><div className="h-5 bg-slate-700/50 rounded-full w-16"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 bg-slate-700/50 rounded w-20"></div></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-medium">
                                                    {user.fname?.charAt(0)}{user.lname?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-200 text-sm">
                                                        {user.fname} {user.lname}
                                                    </div>
                                                    <div className="text-xs text-slate-500">ID: {user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <FiMail className="w-3 h-3 text-slate-500" />
                                                    <span>{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <FiPhone className="w-3 h-3 text-slate-500" />
                                                    <span>{user.phone || "—"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${
                                                    user.role === 'admin' 
                                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                }`}>
                                                    {user.role}
                                                </span>
                                                {user.is_blocked && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                                                        <FiSlash className="w-2.5 h-2.5" />
                                                        Blocked
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                <FiCalendar className="w-3 h-3 text-slate-500" />
                                                {user.join_date || new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {user.role !== 'admin' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleBlock(user.id, user.is_blocked)}
                                                            className={`p-1.5 rounded-lg transition-colors ${
                                                                user.is_blocked 
                                                                ? 'text-emerald-500 hover:bg-emerald-500/10' 
                                                                : 'text-amber-500 hover:bg-amber-500/10'
                                                            }`}
                                                            title={user.is_blocked ? "Unblock user" : "Block user"}
                                                        >
                                                            {user.is_blocked ? <FiCheckCircle className="w-4 h-4" /> : <FiSlash className="w-4 h-4" />}
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(user.id)}
                                                            className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Delete user"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-3">
                                                <FiUsers className="w-5 h-5 text-slate-500" />
                                            </div>
                                            <p className="text-sm text-slate-400">
                                                {search ? "No matching users found" : "No users registered yet"}
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