import { HydratedDocument, Model } from "mongoose";
import { DefaultResponse, UserTokensResponse } from "../types/api/responses.js";
import { UserTokensPayload } from "../types/api/payloads.js";

interface IUser {
  login: string,
  password: string,
  refreshTokenHash?: string,
}

interface IUserMethods {
  register: () => Promise<DefaultResponse>,
  signIn: () => Promise<UserTokensResponse>,
  signOut: () => Promise<DefaultResponse>,
  getTokenPair: (userId: string) => UserTokensPayload,
  updateRefreshHash: (refreshToken: string) => void,
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  refresh: (token: string) => Promise<UserTokensResponse | DefaultResponse>,
}

type NewUser = HydratedDocument<IUser, IUserMethods>

export {
  IUser,
  IUserMethods,
  UserModel,
  NewUser,
};