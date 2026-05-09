import { Router } from "express";
import { recommend } from "../controllers/recommendController";

const recommendRouter = Router();

recommendRouter.get("/", recommend);

export default recommendRouter;
