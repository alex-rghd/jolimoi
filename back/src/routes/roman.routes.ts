import { Router } from "express";
import { convertToRoman } from "../controllers/roman.controller";

const router = Router();

router.post("/convert", convertToRoman);

export default router;