import config from "../../config";

import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import jwt from "jsonwebtoken";

import AppError from "../../errors/AppError";

const signUpInToDb = async (payload: TUser) => {
  if (await User.isUserExistWithCustomId(payload.email)) {
    throw new AppError(409, "email already exist");
  }
  const createUser = await User.create(payload);
  const result = await User.findById(createUser._id).select(
    "-createdAt -updatedAt -__v -password"
  );
  return result;
};

const loginIntoDB = async (payload: TLogin) => {
  const userDoc = await User.isUserExistWithCustomId(payload.email);
  if (!userDoc) {
    throw new AppError(404, "this user is not found");
  }

  const user = await User.findById((userDoc as TUser)._id).select(
    "-createdAt -updatedAt -__v -password"
  );
  console.log("iam user", user);

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(400, "The user is Deleted!");
  }

  // comapre passssword now

  if (!(await User.isPasswordMatched(payload.password, userDoc.password))) {
    throw new AppError(400, "password don't matched");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "7d",
  });
  console.log("accessToken:", accessToken);

  return {
    user,
    accessToken,
  };
};

export const AuthServices = {
  signUpInToDb,
  loginIntoDB,
};
