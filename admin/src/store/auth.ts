import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserT = {
  id: string
  name: string
  email: string
}

export type AuthState = {
  user: UserT | null
  token: string | null
  login: (data: { user: UserT; token: string }) => void
  logout: () => void
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (data: AuthState) =>
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
