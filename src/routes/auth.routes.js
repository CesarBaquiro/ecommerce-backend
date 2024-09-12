import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
import { AuthController } from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post(
    "/login",
    validate(authDto),
    authenticate("login"),
    AuthController.login
);

router.post(
    "/register",
    validate(userDto),
    authenticate("register"),
    AuthController.register
);

router.get("/current", authenticate("jwt"), AuthController.current);

export default router;
