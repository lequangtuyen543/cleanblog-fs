import { Router } from "express";
import * as controller from "../controllers/category.controller";

const router: Router = Router();

router.get("/", controller.index);
router.post("/", controller.create);
router.patch("/:id", controller.edit);
router.delete("/:id", controller.deleteRecord);

export const categoryRoutes: Router = router;

