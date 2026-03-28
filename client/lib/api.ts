import axios from "axios"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

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