import { Router } from "express";
import {
  createDesenvolvedor,
  deleteDesenvolvedor,
  getDesenvolvedores,
  updateDesenvolvedor,
} from "../controllers/desenvolvedores.controller";

const router = Router();

// getDesenvolvedores,createDesenvolvedor,updateDesenvolvedor
// deleteDesenvolvedor

router.post("/desenvolvedores", createDesenvolvedor);
router.get("/desenvolvedores", getDesenvolvedores);
router.put("/desenvolvedores/:id", updateDesenvolvedor);
router.delete("/desenvolvedores/:id", deleteDesenvolvedor);

export default router;
