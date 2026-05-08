import { z } from "zod";

// user schema for create and update

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["customer", "admin"]).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// login schema

export const loginUserSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
