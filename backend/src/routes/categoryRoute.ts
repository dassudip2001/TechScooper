import { Router } from "express";
import {
  get,
  create,
  find,
  put,
  remove,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requiredRole } from "../middleware/roleMiddleware";

const categoryRouter = Router();
categoryRouter.get("/", get);
categoryRouter.post("/", authMiddleware, requiredRole("admin"), create);
categoryRouter.get("/:id", authMiddleware, find);
categoryRouter.put("/:id", authMiddleware, requiredRole("admin"), put);
categoryRouter.delete("/:id", authMiddleware, requiredRole("admin"), remove);

export default categoryRouter;
