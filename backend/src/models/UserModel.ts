import {
  IUser,
  IUserMethods,
  UserModel
} from "./types.js";
import { Schema, model } from "mongoose";
import { handleRequestErr } from "../utils/serverHelpers.js";
import { USER_MSGS } from "../utils/langConstants.js";
import { SERVER_CONFIG } from "../utils/constants.js";
import { DefaultResponse, UserTokensResponse } from "../types/api/responses.js";
import { UserTokensPayload } from "../types/api/payloads.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshTokenHash: { type: String, required: false},
});

UserSchema.method(
  'register',
  async function register (): Promise<DefaultResponse> {
    try {
      const existedUser = await User.findOne({ login: this.login });

      if (existedUser) {
        return {
          isSuccess: false,
          statusCode: 409,
          message: USER_MSGS.alreadyExist,
          payload: null,
        };
      }

      const hashedPwd = await bcrypt.hash(this.password, 8);

      await User.create({
        login: this.login,
        password: hashedPwd,
      });

      return {
        isSuccess: true,
        statusCode: 201,
        message: USER_MSGS.createSuccess,
        payload: null,
      };
    } catch (err: unknown) {
      return handleRequestErr(err);
    }
});

UserSchema.method(
  'signIn',
  async function signIn (): Promise<UserTokensResponse | DefaultResponse> {
    try {
      const existedUser = await User.findOne({ login: this.login });

      if (existedUser) {
        const isPwdCorrect = await bcrypt.compare(this.password, existedUser.password);

        if (isPwdCorrect) {
          const tokens = this.getTokenPair(`${existedUser._id}`);
          
          this.updateRefreshHash(tokens.refreshToken);

          return {
            isSuccess: true,
            statusCode: 200,
            message: USER_MSGS.loginSuccess,
            payload: tokens,
          };
        }
      }

      return {
        isSuccess: false,
        statusCode: 400,
        message: USER_MSGS.invalidData,
        payload: null,
      }
    } catch (err: unknown) {
      return handleRequestErr(err);
    }
});

UserSchema.static(
  'refresh',
  async function refresh(token: string): Promise<UserTokensResponse | DefaultResponse> {
    try {
      const isTokenValid = jwt.verify(token, SERVER_CONFIG.secretWord);
      const tokenData = jwt.decode(token);

      if (
        isTokenValid
        && tokenData
        && typeof tokenData !== 'string'
        && 'id' in tokenData
      ) {
        const existedUser = await User.findOne({ _id: tokenData.id });
        let isHashValid = false;

        if (existedUser && existedUser.refreshTokenHash) {
          const reversedToken = token.split('').reverse().join('');
          isHashValid = await bcrypt.compare(reversedToken, existedUser.refreshTokenHash);
        }

        if (existedUser && isHashValid) {
          const tokens = existedUser.getTokenPair(tokenData.id);
          
          existedUser.updateRefreshHash(tokens.refreshToken);

          return {
            isSuccess: true,
            statusCode: 200,
            message: 'Обновление токенов прошло успешно!',
            payload: tokens,
          };
        }
      }

      return {
        isSuccess: false,
        statusCode: 400,
        message: 'Переданный некорректный токен обновления!',
        payload: null,
      }
    } catch (err: unknown) {
      return handleRequestErr(err);
    }
  }
)

UserSchema.method(
  'getTokenPair',
  function getTokenPair(userId: string): UserTokensPayload {
    const {
      accessTokenExpTime,
      refreshTokenExpTime,
      secretWord
    } = SERVER_CONFIG;

    return {
      accessToken: jwt.sign(
        { id: userId },
        secretWord,
        { expiresIn: accessTokenExpTime }
      ),
      refreshToken: jwt.sign(
        { id: userId },
        secretWord,
        { expiresIn: refreshTokenExpTime },
      )
    };
  }
)

UserSchema.method(
  'updateRefreshHash',
  async function updateRefreshHash(refreshToken: string) {
    /**
     * Bcrypt хэширует только первые 72 символа строки,
     * которые одинаковы у разных jwt токенов, поэтому разворачиваем токен.
     */
    const reversedToken = refreshToken.split('').reverse().join('');
    const refreshTokenHash = await bcrypt.hash(reversedToken, 8);
          
    await User.updateOne(
      { login: this.login },
      { $set: { refreshTokenHash }},
    );
  }
)

export const User = model<IUser, UserModel>('User', UserSchema);
