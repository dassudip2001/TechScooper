import { ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Mock rating
  const rating = 4.5 + Math.random() * 0.5;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 rounded-xl animate-pulse" />
        )}
        
        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-full bg-slate-900/90 backdrop-blur-md text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg">
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">
              {product.category?.name || 'Uncategorized'}
            </p>
            <h3 className="font-bold text-slate-900 leading-tight">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-slate-700">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-md ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
