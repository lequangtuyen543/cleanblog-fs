import { Router } from "express";
import * as controller from "../controllers/role.controller";
const router: Router = Router();  

router.get('/', controller.index);
router.post('/create', controller.createRecord);
router.patch('/edit/:id', controller.editRecord);
router.delete('/delete/:id', controller.deleteRecord);
router.patch('/permissions', controller.permissions);

export const roleRoutes: Router = router;