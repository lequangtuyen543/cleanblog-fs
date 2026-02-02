import { Router } from "express";
import * as controller from "../controllers/post.controller";
const router: Router = Router();

router.get("/", controller.index);
router.get("/:id", controller.detail);

export const postRoutes: Router = router;