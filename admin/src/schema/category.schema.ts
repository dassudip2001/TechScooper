import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string().min(2),
})

export const readCategorySchema = createCategorySchema.extend({
  id: z.number(),
})

export const updateCategorySchema = createCategorySchema.partial()

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>

export type CategoryReadT = z.infer<typeof readCategorySchema>
export type CategoryWriteT = z.infer<typeof createCategorySchema>
