import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./types.js";
import { dbOperationResult } from "../utils/types.js";
import { handleRequestErr } from "../utils/serverHelpers.js";
import { USER_MSGS } from "../utils/langConstants.js";

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  login: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.method(
  'signIn',
  async function signIn (): Promise<dbOperationResult> {
    try {
      const existedUser = await User.findOne({ login: this.login });

      if (existedUser && existedUser.password === this.password) {
        return {
          isSuccess: true,
          statusCode: 200,
          message: USER_MSGS.loginSuccess
        };
      }

      return {
        isSuccess: false,
        statusCode: 400,
        message: USER_MSGS.invalidData
      }
    } catch (err: unknown) {
      return handleRequestErr(err);
    }
});

UserSchema.method(
  'register',
  async function register (): Promise<dbOperationResult> {
    try {
      const existedUser = await User.findOne({ login: this.login });

      if (existedUser) {
        return {
          isSuccess: false,
          statusCode: 409,
          message: USER_MSGS.alreadyExist
        };
      }

      await User.create(this);

      return {
        isSuccess: true,
        statusCode: 201,
        message: USER_MSGS.createSuccess
      };
    } catch (err: unknown) {
      return handleRequestErr(err);
    }
});

export const User = model<IUser, UserModel>('User', UserSchema);
