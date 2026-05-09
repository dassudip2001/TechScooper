import { Router } from "express";
import { recommend } from "../controllers/recommendController";

const recommendRouter = Router();

recommendRouter.get("/:id", recommend);

export default recommendRouter;
