import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router();

router.get("/mocks", UserController.createMock)
router.get("/mocks/:quantity", UserController.createMocks)
router.get("/mocks/mockingusers", UserController.mockingUsers)
router.post("/mocks/generateData", UserController.generateData)

export default router;
