import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Header />
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      <footer className="bg-white border-t border-slate-200 mt-24 py-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} ModernFurnish. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
