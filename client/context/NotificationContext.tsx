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
    
    // Auto remove after 4 seconds — feels responsive without being rushed
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 4000)
  }

  // Notification styling — subtle shadows, clean borders, easy to read
  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-white border-l-4 border-emerald-500 shadow-md text-emerald-800"
      case "error":
        return "bg-white border-l-4 border-red-500 shadow-md text-red-800"
      case "warning":
        return "bg-white border-l-4 border-amber-500 shadow-md text-amber-800"
      default:
        return "bg-white border-l-4 border-blue-500 shadow-md text-blue-800"
    }
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="w-5 h-5 text-emerald-500" />
      case "error":
        return <FiXCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <FiAlertTriangle className="w-5 h-5 text-amber-500" />
      default:
        return <FiInfo className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Notification Container — clean, non-intrusive, easy to dismiss */}
      <div className="fixed bottom-5 right-5 z-[1000] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-center gap-3 p-3 rounded-lg ${getNotificationStyles(n.type)} animate-in slide-in-from-right-5 fade-in duration-200`}
          >
            <div className="shrink-0">
              {getIcon(n.type)}
            </div>
            <p className="text-sm font-medium flex-grow leading-relaxed">
              {n.message}
            </p>
            <button
              onClick={() => setNotifications((prev) => prev.filter((not) => not.id !== n.id))}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <FiXCircle className="w-4 h-4" />
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