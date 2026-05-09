import axios from "axios"
import { useAuthStore } from "@/store/auth"

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

const getAuthToken = (): string | null => {
  const storeToken = useAuthStore.getState().token
  if (storeToken) return storeToken

  const persisted = localStorage.getItem("auth-storage")
  if (!persisted) return null

  try {
    const parsed = JSON.parse(persisted) as {
      state?: { token?: string | null }
    }
    return parsed?.state?.token ?? null
  } catch {
    return null
  }
}

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

export { handleRequest, axiosInstance }
