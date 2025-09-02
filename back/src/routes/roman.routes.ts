import { Router } from "express";
import {
  convertToRoman,
  convertToRomanEvent
} from "../controllers/roman.controller";

const router = Router();

router.post("/convert", convertToRoman);
router.get("/events", convertToRomanEvent);

export default router;
