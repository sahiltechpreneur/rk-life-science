"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle } from "react-icons/fi"

type NotificationType = "success" | "error" | "info" | "warning"

type Notification = {
  id: number
  message: string
  type: NotificationType
}

type NotificationContextType = {
  showNotification: (message: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (message: string, type: NotificationType = "info") => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-center gap-4 p-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right fade-in duration-300 ${
              n.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" :
              n.type === "error" ? "bg-red-50 border-red-100 text-red-800" :
              n.type === "warning" ? "bg-amber-50 border-amber-100 text-amber-800" :
              "bg-blue-50 border-blue-100 text-blue-800"
            }`}
          >
            <div className="shrink-0">
              {n.type === "success" && <FiCheckCircle className="w-5 h-5 text-emerald-500" />}
              {n.type === "error" && <FiXCircle className="w-5 h-5 text-red-500" />}
              {n.type === "warning" && <FiAlertTriangle className="w-5 h-5 text-amber-500" />}
              {n.type === "info" && <FiInfo className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-sm font-bold flex-grow">{n.message}</p>
            <button
              onClick={() => setNotifications((prev) => prev.filter((not) => not.id !== n.id))}
              className="ml-2 hover:opacity-70 transition-opacity"
            >
              <FiXCircle className="w-4 h-4 opacity-50" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("useNotification must be used within NotificationProvider")
  return context
}
