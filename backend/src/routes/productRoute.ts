import { Router } from "express";
import {
  get,
  create,
  find,
  put,
  remove,
  getPublic,
  findPublic,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requiredRole } from "../middleware/roleMiddleware";
import { logMiddleware } from "../middleware/logMiddleware";

const productRouter = Router();

// public routes
productRouter.get("/public", getPublic);
productRouter.get("/public./:id", findPublic);
// protect all routes with auth and admin rolee.g. only admin can manage products
productRouter.get("/", authMiddleware, requiredRole("admin"), get);
productRouter.post(
  "/",
  authMiddleware,
  requiredRole("admin"),
  logMiddleware("createProduct"),
  create,
);
productRouter.get("/:id", authMiddleware, requiredRole("admin"), find);
productRouter.put(
  "/:id",
  authMiddleware,
  requiredRole("admin"),
  logMiddleware("updateProduct"),
  put,
);
productRouter.delete(
  "/:id",
  authMiddleware,
  requiredRole("admin"),
  logMiddleware("deleteProduct"),
  remove,
);

export default productRouter;
