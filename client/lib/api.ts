import axios from "axios"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

// Request interceptor to add token to headers
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Detailed logging for debugging fetch errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If it's a network error (no response), log the string message
    if (error.response) {
      console.error("API Response Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else {
      console.error("API Network/Connection Error:", error.message || "Unknown Error");
    }
    return Promise.reject(error);
  }
);

export default API