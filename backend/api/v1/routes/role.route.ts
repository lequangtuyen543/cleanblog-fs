import { Router } from "express";
import * as controller from "../controllers/role.controller";
const router: Router = Router();  

router.get('/', controller.index);
router.post('/create', controller.createRecord);

export const roleRoutes: Router = router;