import express from "express";
import { AuthController } from "./auth.controller";

import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middleware/validetRequest";
import { UserValidation } from "../user/user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthController.signUpUser
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.LoginIntoDB
);

export const AuthRoutes = router;
