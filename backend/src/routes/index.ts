import { Router } from "express";
import DesenvolvedoresRoutes from "./desenvolvedores.routes";
import NiveisRoutes from "./niveis.routes";

const routes = Router();

routes.use("/niveis", NiveisRoutes);
routes.use("/desenvolvedores", DesenvolvedoresRoutes);

export default routes;
