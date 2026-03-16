import { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
const router: Router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/info", authMiddleware.requireAuth, controller.info);
router.get("/list", authMiddleware.requireAuth, controller.list);
router.post("/create", authMiddleware.requireAuth, controller.create);
router.get("/detail/:id", authMiddleware.requireAuth, controller.detail);
router.patch("/edit/:id", authMiddleware.requireAuth, controller.edit);
router.patch("/edit-profile", authMiddleware.requireAuth, controller.editProfile);
router.delete("/delete/:id", authMiddleware.requireAuth, controller.deleteUser);
router.patch("/change-password", authMiddleware.requireAuth, controller.changePassword);


export const userRoutes: Router = router;
