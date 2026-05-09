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
categoryRouter.get("/", authMiddleware, get);
categoryRouter.post("/", authMiddleware, create);
categoryRouter.get("/", authMiddleware, find);
categoryRouter.put("/", authMiddleware, put);
categoryRouter.delete("/", authMiddleware, remove);

export default categoryRouter;
