import { Router } from "express";
import {
  createDesenvolvedor,
  deleteDesenvolvedor,
  getDesenvolvedores,
  updateDesenvolvedor,
} from "../controllers/desenvolvedores.controller";

const routes = Router();

routes.post("/", createDesenvolvedor);
routes.get("/", getDesenvolvedores);
routes.put("/:id", updateDesenvolvedor);
routes.delete("/:id", deleteDesenvolvedor);

export default routes;
