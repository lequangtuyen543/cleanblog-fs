import { Router } from "express";
import * as controller from "../controllers/post.controller";
const router: Router = Router();

router.get("/", controller.index);

export const postRoutes: Router = router;