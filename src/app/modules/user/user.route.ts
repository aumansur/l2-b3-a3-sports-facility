import express from "express";
import { UserController } from "./user.controller";

import { UserValidation } from "./user.validation";
import validateRequest from "../../middleware/validetRequest";

const router = express.Router();

router.get("/get-user", UserController.getUserByEmail);
router.post(
  "/create-admin",
  validateRequest(UserValidation.userValidationSchema),
  UserController.createAdmin
);

export const userRoutes = router;
