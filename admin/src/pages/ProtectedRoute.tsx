import { useAuthStore } from "@/store/auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ProtectedRoute() {
  const accessToken = useAuthStore((state: any) => state.token)

  const location = useLocation()

  // Not logged in
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
