import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  findProduct,
  findPublicProduct,
  getProduct,
  getPublicProduct,
  isError,
  updateProduct,
} from "../services/productService";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";

// -------------------------------- admin controllers --------------------------------
export async function get(req: Request, res: Response): Promise<void> {
  const result = await getProduct(req.query);
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
export async function create(req: Request, res: Response): Promise<void> {
  const parsed = createProductSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      fields: parsed.error?.errors?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  const result = await createProduct(parsed.data);
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.status(201).json(result.data);
}
export async function find(req: Request, res: Response): Promise<void> {
  const result = await findProduct(Number(req.params.id));
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
}
export async function put(req: Request, res: Response): Promise<void> {
  const parsed = updateProductSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      fields: parsed.error?.errors?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  const result = await updateProduct(Number(req.params.id), parsed.data);
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
export async function remove(req: Request, res: Response) {
  const result = await deleteProduct(Number(req.params.id));
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}

// -------------------------------- public controllers --------------------------------
export async function findPublic(req: Request, res: Response): Promise<void> {
  const result = await findPublicProduct(
    Number(req.params.id),
    req.user?.id, // passes userId for view tracking
  );
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
}

export async function getPublic(req: Request, res: Response): Promise<void> {
  const result = await getPublicProduct(req.query);
  if (isError(result)) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  res.json(result.data);
}
