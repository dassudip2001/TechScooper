import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserT = {
  id: string
  name: string
  email: string
}

type LoginPayload = {
  user: UserT
  token: string
}

type AuthState = {
  user: UserT | null
  token: string | null

  login: (data: LoginPayload) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (data) =>
        set({
          user: data.user,
          token: data.token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
)
