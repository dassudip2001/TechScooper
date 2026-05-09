import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  findCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";
import { isError } from "../services/productService";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";

export async function get(req: Request, res: Response) {
  const result = await getCategories();
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
export async function create(req: Request, res: Response) {
  const parse = createCategorySchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({
      error: "Validation failed",
      fields: parse.error?.issues?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }
  const result = await createCategory(parse.data);
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.status(201).json(result.data);
}
export async function find(req: Request, res: Response) {
  const result = await findCategory(Number(req.params.id));
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
export async function put(req: Request, res: Response) {
  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      fields: parsed.error?.issues?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }
  const result = await updateCategory(Number(req.params.id), parsed.data);
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
export async function remove(req: Request, res: Response) {
  const result = await deleteCategory(Number(req.params.id));
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
