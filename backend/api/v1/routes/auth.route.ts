import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router: Router = Router();

// POST /api/v1/auth/register
router.post("/register", userController.register);

// POST /api/v1/auth/login
router.post("/login", userController.login);

export const authRoutes: Router = router;

