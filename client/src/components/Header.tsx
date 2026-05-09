import { ShoppingCart, Search, User, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden md:block">ModernFurnish</span>
          </a>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-50/50 hover:bg-white focus:bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all duration-300"
            placeholder="Search for furniture..."
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden md:block">
            <User className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative group">
            <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
