import { Router } from "express";
import * as controller from "../controllers/post.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
const router: Router = Router();

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.post("/create", authMiddleware.requireAuth, controller.create);

export const postRoutes: Router = router;