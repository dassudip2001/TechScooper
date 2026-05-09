import { prisma } from "../lib/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";
import { ServiceResult } from "./productService";

export async function getCategories(): Promise<ServiceResult<object[]>> {
  try {
    const categories = await prisma.category.findMany();
    return { data: categories };
  } catch (err) {
    console.error("Somthing went wrong to retrive data", err);
    return { error: "Somthing went wrong to retrive data", status: 500 };
  }
}
export async function createCategory(
  date: CreateCategoryInput,
): Promise<ServiceResult<object>> {
  try {
    const category = await prisma.category.create({ data: date });
    return { data: category };
  } catch (err) {
    console.error("Somthing went wrong to create category", err);
    return { error: "Somthing went wrong to create category", status: 500 };
  }
}
export async function findCategory(id: number): Promise<ServiceResult<object>> {
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return { error: "Category not found", status: 404 };
    }
    return { data: category };
  } catch (err) {
    console.error("Somthing went wrong to find category", err);
    return { error: "Somthing went wrong to find category", status: 500 };
  }
}
export async function updateCategory(
  id: number,
  data: UpdateCategoryInput,
): Promise<ServiceResult<object>> {
  try {
    const category = await prisma.category.update({ where: { id }, data });
    return { data: category };
  } catch (err) {
    console.error("Somthing went wrong to update category", err);
    return { error: "Somthing went wrong to update category", status: 500 };
  }
}
export async function deleteCategory(
  id: number,
): Promise<ServiceResult<object>> {
  try {
    const category = await prisma.category.delete({ where: { id } });
    return { data: category };
  } catch (err) {
    console.error("Somthing went wrong to delete category", err);
    return { error: "Somthing went wrong to delete category", status: 500 };
  }
}
