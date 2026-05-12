import { axiosInstance } from "@/lib/axios"
import { API_ENDPOINTS } from "./data"
import type { LogT } from "@/types/log.type"

export interface LogServiceT {
  get: () => Promise<LogT[]>
  
}

export const logService: Readonly<LogServiceT> = Object.freeze({
  async get(): Promise<LogT[]> {
    return axiosInstance
      .get<LogT[]>(API_ENDPOINTS.LOGS)
      .then((res) => res.data) 
  },

  
} as const)
