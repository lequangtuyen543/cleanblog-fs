import { Router } from "express";
import * as controller from "../controllers/setting.controller";

const router: Router = Router();

router.get("/", controller.index);
router.patch("/", controller.upsert);

export const settingRoutes: Router = router;

