"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { useNotification } from "@/context/NotificationContext"
import { FiSearch, FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiSlash, FiTrash2, FiCheckCircle } from "react-icons/fi"

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
            const res = await API.get(`/auth/users`) // Updated endpoint
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
            showNotification(`User ${!isBlocked ? 'blocked' : 'unblocked'} successfully`, "success")
            fetchUsers()
        } catch (error) {
            showNotification("Failed to update user status", "error")
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to PERMANENTLY delete this user? This action cannot be undone.")) return
        try {
            await API.delete(`/auth/users/${id}`)
            showNotification("User deleted permanently", "success")
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
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[85vh] bg-transparent">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900">
                        Customers
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 ml-2">
                            Directory
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm font-medium">Manage and view registered users</p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center mb-8 hover:shadow-md transition-shadow duration-300">
                <FiSearch className="text-gray-400 w-5 h-5 ml-2" />
                <input 
                    placeholder="Search users by name or email..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 px-4 py-2 text-sm sm:text-base outline-none" 
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Role & Status</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                                                <div className="h-4 bg-gray-100 rounded w-24"></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                                        <td className="px-6 py-5"><div className="h-6 bg-gray-100 rounded-full w-16"></div></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group cursor-default">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center border border-blue-200 shadow-sm text-blue-600 font-bold">
                                                    {user.fname.charAt(0)}{user.lname.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {user.fname} {user.lname}
                                                    </div>
                                                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                        <FiUser className="w-3 h-3" /> ID: #{user.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <FiMail className="w-4 h-4 text-gray-400" />
                                                    <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors">{user.email}</a>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <FiPhone className="w-4 h-4 text-gray-400" />
                                                    {user.phone || <span className="text-gray-400 italic">Not provided</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-2">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit ${
                                                    user.role === 'admin' 
                                                    ? 'bg-purple-50 text-purple-700 border-purple-200' 
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                }`}>
                                                    {user.role === 'admin' && <FiShield className="w-3 h-3" />}
                                                    {user.role}
                                                </span>
                                                {user.is_blocked && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-red-50 text-red-700 border-red-200 w-fit">
                                                        <FiSlash className="w-3 h-3" /> Blocked
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                                <FiCalendar className="w-4 h-4 text-gray-400" />
                                                {user.join_date || new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {user.role !== 'admin' && (
                                                    <>
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); handleBlock(user.id, user.is_blocked); }}
                                                            className={`p-2 rounded-lg border transition-all ${
                                                                user.is_blocked 
                                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white' 
                                                                : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white'
                                                            }`}
                                                            title={user.is_blocked ? "Unblock User" : "Block User"}
                                                        >
                                                            {user.is_blocked ? <FiCheckCircle className="w-4 h-4" /> : <FiSlash className="w-4 h-4" />}
                                                        </button>
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}
                                                            className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                                            title="Delete User"
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
                                    <td colSpan={4} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                                                <FiSearch className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">No users found</h3>
                                            <p className="text-gray-500 max-w-sm">
                                                {search ? "We couldn't find any users matching your search." : "There are currently no users registered in the system."}
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
