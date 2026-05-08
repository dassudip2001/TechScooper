import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/userService";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import { ZodError } from "zod";

export async function register(req: Request, res: Response) {
  try {
    const validatedData = createUserSchema.parse(req.body);
    await registerUser(validatedData);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginUserSchema.parse(req.body);
    const result = await loginUser(validatedData);

    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: "Validation failed",
        fields: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    res.status(500).json({ error: "Unknown error" });
  }
}
