import { Router } from "express";
import {
  get,
  create,
  find,
  put,
  remove,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";

const categoryRouter = Router();
categoryRouter.get("/", get);
categoryRouter.post("/", authMiddleware, create);
categoryRouter.get("/:id", authMiddleware, find);
categoryRouter.put("/:id", authMiddleware, put);
categoryRouter.delete("/:id", authMiddleware, remove);

export default categoryRouter;
