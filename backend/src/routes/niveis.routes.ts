import { Router } from "express";
import {
  createNivel,
  deleteNivel,
  getNiveis,
  updateNivel,
} from "../controllers/niveis.controller";

const routes = Router();

routes.get("/", getNiveis);
routes.post("/", createNivel);
routes.put("/:id", updateNivel);
routes.delete("/:id", deleteNivel);

export default routes;
