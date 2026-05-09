import { Router } from "express";
import { upload } from "../controllers/FileUploadController";

const router = Router();

router.post("/", upload);

export default router;
