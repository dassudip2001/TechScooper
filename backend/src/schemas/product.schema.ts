import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),

  description: z.string().optional(),

  price: z.number().positive(),

  stock: z.int().min(0),

  imageUrl: z.string().url().optional(),

  categoryId: z.int().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
