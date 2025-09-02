import { Router } from "express";
import {
  convertToRoman,
  // convertToRomanEvent,
  convertToRomanEventV2
} from "../controllers/roman.controller";

const router = Router();

router.post("/convert", convertToRoman);
router.get("/events", convertToRomanEventV2);

export default router;
