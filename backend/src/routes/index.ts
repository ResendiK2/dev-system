import { Router } from "express";
import DesenvolvedoresRoutes from "./desenvolvedores.routes";
import NiveisRoutes from "./niveis.routes";

const router = Router();

router.use("/niveis", NiveisRoutes);
router.use("/desenvolvedores", DesenvolvedoresRoutes);

export default router;
