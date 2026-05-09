import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import { ProductService } from "../product.service";
import { getImageUrl } from "../cloudfont";
import { recomemntService } from "../recommend.service";
import { ProductCard } from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductService.find(Number(id)),
    enabled: !!id,
  });

  const { data: recommends = [], isLoading: isRecommendsLoading } = useQuery({
    queryKey:["recommends",id],
    queryFn:()=>recomemntService.get(Number(id)),
    enabled:!!id
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Product not found
          </h3>
          <p className="text-slate-500 mb-8">
            The product you're looking for doesn't exist or an error occurred.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const rating = 4.5 + Math.random() * 0.5;

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery (Simplified) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-slate-50 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={getImageUrl(product.imageUrl)}
                alt={product.name}
                className="max-w-full h-auto object-contain mix-blend-multiply"
              />
            ) : (
              <div className="w-full aspect-square bg-slate-200 rounded-2xl flex items-center justify-center">
                <span className="text-slate-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-700">
                  {rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-slate-400">(128 reviews)</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-slate-900">
                {product.price}
              </span>
              <span
                className={`px-3 py-1 rounded-md text-sm font-medium mb-1 ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="prose prose-slate mb-10">
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-auto space-y-6">
              <button
                disabled={product.stock === 0}
                className="w-full bg-slate-900 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
              >
                <ShoppingBag className="w-5 h-5" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Free Shipping</p>
                    <p className="text-xs">On orders over 500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">2-Year Warranty</p>
                    <p className="text-xs">Full coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
          You might also like
        </h2>
        
        {isRecommendsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
          </div>
        ) : recommends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommends.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No recommendations available at this time.</p>
        )}
      </div>
    </main>
  );
}
