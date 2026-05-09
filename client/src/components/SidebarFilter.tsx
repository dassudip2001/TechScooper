import type { Category } from "../data/products";

interface SidebarFilterProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

export function SidebarFilter({ categories, selectedCategoryId, onSelectCategory }: SidebarFilterProps) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24">
        <h3 className="font-semibold text-lg mb-4 text-slate-900">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex justify-between items-center ${
                selectedCategoryId === null
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex justify-between items-center ${
                  selectedCategoryId === category.id
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <hr className="my-6 border-slate-100" />

        <h3 className="font-semibold text-lg mb-4 text-slate-900">Price Range</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="2000" 
            className="w-full accent-slate-900" 
          />
          <div className="flex justify-between text-sm text-slate-500 font-medium">
            <span>$0</span>
            <span>$2,000+</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
