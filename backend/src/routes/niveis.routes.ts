import { Router } from "express";
import {
  createNivel,
  deleteNivel,
  getNiveis,
  updateNivel,
} from "../controllers/niveis.controller";

const router = Router();

router.get("/niveis", getNiveis);
router.post("/niveis", createNivel);
router.put("/niveis/:id", updateNivel);
router.delete("/niveis/:id", deleteNivel);

export default router;
