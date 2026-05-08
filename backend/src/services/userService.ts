import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
export async function registerUser(data: CreateUserInput) {
  try {
    const { name, email, password } = data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "Email already in use" };

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });
    return { user };
  } catch (err) {
    console.error("Somthing went wrong in Register user ", err);
    return { error: "Something went wrong", status: 500 };
  }
}

type AuthSuccess = {
  token: string;
  user: { id: number; name: string; email: string; role: string };
};
type AuthError = { error: string; status: number };
type AuthResult = AuthSuccess | AuthError;

export async function loginUser(data: LoginUserInput): Promise<AuthResult> {
  try {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { error: "Invalid credentials", status: 401 };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (err) {
    console.error("loginUser error:", err);
    return { error: "Something went wrong", status: 500 };
  }
}
