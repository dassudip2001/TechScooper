export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: number | null;
  createdAt: string;
  category?: Category | null;
}

export const mockCategories: Category[] = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Dining" },
  { id: 3, name: "Lighting" },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Minimalist Modern Sofa",
    description: "A high-quality minimalist modern sofa with gray fabric, perfect for contemporary living rooms.",
    price: 899.99,
    stock: 12,
    imageUrl: "/images/modern_sofa.png",
    categoryId: 1,
    createdAt: new Date().toISOString(),
    category: mockCategories[0],
  },
  {
    id: 2,
    name: "Mid-Century Lounge Chair",
    description: "An elegant mid-century modern lounge chair featuring walnut wood and premium cream leather.",
    price: 450.00,
    stock: 5,
    imageUrl: "/images/lounge_chair.png",
    categoryId: 1,
    createdAt: new Date().toISOString(),
    category: mockCategories[0],
  },
  {
    id: 3,
    name: "Solid Oak Dining Table",
    description: "A beautiful solid oak minimalist dining table that seats up to six people comfortably.",
    price: 1200.00,
    stock: 3,
    imageUrl: "/images/dining_table.png",
    categoryId: 2,
    createdAt: new Date().toISOString(),
    category: mockCategories[1],
  },
  {
    id: 4,
    name: "Matte Black Floor Lamp",
    description: "A sleek, matte black modern floor lamp that provides soft, warm lighting for any room.",
    price: 180.50,
    stock: 20,
    imageUrl: "/images/floor_lamp.png",
    categoryId: 3,
    createdAt: new Date().toISOString(),
    category: mockCategories[2],
  },
];
