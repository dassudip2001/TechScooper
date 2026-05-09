import { Router } from "express";
import { getLogs } from "../controllers/logController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requiredRole } from "../middleware/roleMiddleware";

const router = Router();

router.get("/", authMiddleware, requiredRole("admin"), getLogs);

export default router;
