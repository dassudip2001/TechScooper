import { axiosInstance } from "@/lib/axios"
import { API_ENDPOINTS } from "./data"
import type { LoginUserInput } from "@/schema/user.schema"
import type { LoginResponse } from "@/types/api"

export interface AuthServiceT {
  login(data: LoginUserInput): Promise<LoginResponse>
  logout(): Promise<void>
}

export const AuthService: Readonly<AuthServiceT> = Object.freeze({
  async login(data: LoginUserInput): Promise<LoginResponse> {
    return axiosInstance
      .post<LoginResponse>(API_ENDPOINTS.LOGIN, data)
      .then((res) => res.data)
  },

  async logout(): Promise<void> {
    return axiosInstance
      .post(`${API_ENDPOINTS.LOGIN}/logout`)
      .then(() => undefined)
  },
} as const)
