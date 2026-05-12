import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import DahboardPage from "./pages/dashboard"
import DashboardLayout from "./pages/dashboardLayout"
import ProtectedRoute from "./pages/ProtectedRoute"
import ProductPage from "./pages/products"
import CategoryPage from "./pages/category"
import AddEditProductPage from "./pages/product/AddEditProductPage"
import LogsPage from "./pages/logs"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DahboardPage />} />

          <Route path="products" element={<ProductPage />} />
          <Route path="product/add" element={<AddEditProductPage />} />
          <Route path="product/edit/:id" element={<AddEditProductPage />} />
          <Route path="logs" element={<LogsPage/>}/>

          <Route path="category" element={<CategoryPage />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
