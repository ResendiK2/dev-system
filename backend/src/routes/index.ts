import { Router } from "express";
import DevsRoutes from "./DevsRoutes";
import LevelsRoutes from "./LevelsRoutes";

const router = Router();

router.use("/desenvolvedores", DevsRoutes);
router.use("/niveis", LevelsRoutes);

export default router;
