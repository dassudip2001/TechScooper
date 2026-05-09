import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SidebarFilter } from "../components/SidebarFilter";
import { ProductCard } from "../components/ProductCard";
import { ProductService } from "../product.service";
import { CategoryService } from "../category.service";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.get(),
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.get(),
  });

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? products.filter((p) => p.categoryId === selectedCategory)
        : products,
    [products, selectedCategory],
  );

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8 md:mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Curated{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Comfort.
          </span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Discover our premium selection of modern furniture, designed to
          elevate your living space with minimalist elegance and timeless
          quality.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <SidebarFilter
          categories={categories}
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex-1 w-full">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-slate-500 font-medium">
              Showing{" "}
              <span className="text-slate-900 font-bold">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white font-medium text-slate-700 outline-none focus:ring-2 focus:ring-slate-900/10">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsLoading ? (
              <p className="text-slate-500 col-span-full">
                Loading products...
              </p>
            ) : null}

            {productsError ? (
              <p className="text-red-500 col-span-full">
                Failed to load products. Please try again.
              </p>
            ) : null}

            {!productsLoading && !productsError
              ? filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={
                      categories.find((c) => c.id === product.categoryId)
                        ?.name
                    }
                  />
                ))
              : null}
          </div>

          {!productsLoading &&
            !productsError &&
            filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛋️</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your filters or category selection.
                </p>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
