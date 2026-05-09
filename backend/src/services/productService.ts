import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";

export interface ListProductsInput {
  category?: string;
  search?: string;
  page?: string;
  limit?: string;
}

type ServiceSuccess<T> = { data: T };
type ServiceError = { error: string; status: number };
export type ServiceResult<T> = ServiceSuccess<T> | ServiceError;

export function isError<T>(r: ServiceResult<T>): r is ServiceError {
  return "error" in r;
}

export async function getProduct(
  data: ListProductsInput,
): Promise<ServiceResult<object[]>> {
  try {
    const { category, search, page = "1", limit = "20" } = data;

    const products = await prisma.product.findMany({
      where: {
        ...(category ? { categoryId: Number(category) } : {}),
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
      },
      include: { category: true },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    });

    return { data: products };
  } catch (err) {
    console.error("[productService.list]", err);
    return { error: "Failed to fetch products", status: 500 };
  }
}
export async function createProduct(
  data: CreateProductInput,
): Promise<ServiceResult<object>> {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: new Prisma.Decimal(data.price),
        stock: data.stock ?? 0,
        categoryId: data.categoryId ?? null,
        imageUrl: data.imageUrl ?? null,
      },
    });

    return { data: product };
  } catch (err) {
    console.error("[productService.create]", err);
    return { error: "Failed to create product", status: 500 };
  }
}
export async function findProduct(id: number): Promise<ServiceResult<object>> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) return { error: "Product not found", status: 404 };

    return { data: product };
  } catch (err) {
    console.error("[productService.getOne]", err);
    return { error: "Failed to fetch product", status: 500 };
  }
}
export async function updateProduct(
  id: number,
  data: UpdateProductInput,
): Promise<ServiceResult<object>> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.price !== undefined && {
          price: new Prisma.Decimal(data.price),
        }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
      },
    });

    return { data: product };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { error: "Product not found", status: 404 };
    }
    console.error("[productService.update]", err);
    return { error: "Failed to update product", status: 500 };
  }
}
export async function deleteProduct(
  id: number,
): Promise<ServiceResult<{ deleted: boolean }>> {
  try {
    await prisma.product.delete({ where: { id } });
    return { data: { deleted: true } };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { error: "Product not found", status: 404 };
    }
    console.error("[productService.delete]", err);
    return { error: "Failed to delete product", status: 500 };
  }
}

// --------------------------------------- PUBLIC API ROUTES ---------------------------------------
export async function findPublicProduct(
  id: number,
  userId?: number,
): Promise<ServiceResult<object>> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) return { error: "Product not found", status: 404 };

    // Track view
    if (userId) {
      prisma.userView
        .create({ data: { userId, productId: id } })
        .catch(() => {});
    }

    return { data: product };
  } catch (err) {
    console.error("[productService.getOne]", err);
    return { error: "Failed to fetch product", status: 500 };
  }
}

export async function getPublicProduct(
  data: ListProductsInput,
): Promise<ServiceResult<object[]>> {
  try {
    const { category, search, page = "1", limit = "20" } = data;

    const products = await prisma.product.findMany({
      where: {
        ...(category ? { categoryId: Number(category) } : {}),
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
      },
      include: { category: true },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    });

    return { data: products };
  } catch (err) {
    console.error("[productService.list]", err);
    return { error: "Failed to fetch products", status: 500 };
  }
}
