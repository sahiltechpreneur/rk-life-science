import axios from "axios"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

// Detailed logging for debugging fetch errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Fetch Error Detail:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default API