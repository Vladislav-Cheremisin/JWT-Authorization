import { HydratedDocument, Model } from "mongoose";
import { dbOperationResult } from "../utils/types.js";

interface IUser {
  login: string,
  password: string,
}

interface IUserMethods {
  signIn: () => Promise<dbOperationResult>,
  register: () => Promise<dbOperationResult>,
}

type UserModel = Model<IUser, {}, IUserMethods>;

type newUser = HydratedDocument<IUser, IUserMethods>

export {
  IUser,
  IUserMethods,
  UserModel,
  newUser,
};