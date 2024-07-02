import catchAsync from "../../utils/catchAsync";

import { AuthServices } from "./auth.services";

import sendResponse from "../../utils/sendResponse";

const signUpUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpInToDb(req.body);

  sendResponse(res, {
    success: true,

    statusCode: 200,
    message: "user registered successfully",
    data: result,
  });
});

const LoginIntoDB = catchAsync(async (req, res) => {
  const result = await AuthServices.loginIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user Logged In succesfully",
    token: result.accessToken,
    data: result.user,
  });
});

export const AuthController = {
  signUpUser,
  LoginIntoDB,
};
