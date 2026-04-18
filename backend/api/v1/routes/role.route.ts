import { Router } from "express";
import * as controller from "../controllers/role.controller";
const router: Router = Router();  

router.get("/", controller.index);
router.post("/", controller.createRecord);
router.patch("/:id", controller.editRecord);
router.delete("/:id", controller.deleteRecord);

export const roleRoutes: Router = router;