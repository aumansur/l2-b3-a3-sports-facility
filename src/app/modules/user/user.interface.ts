/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose";

export interface TUserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface TUser extends Document {
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  passwordChangedAt?: Date;
  isDeleted: boolean;
  address: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistWithCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJwtIssuedBeforeFunctionPasswordChanged(
    passwordChangeTime: Date,
    jwtIssuedTime: number
  ): Promise<boolean>;
}
