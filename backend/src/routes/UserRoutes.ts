import * as core from "express-serve-static-core";
import { User } from "../models/UserModel.js";
import { NewUser } from "../models/types.js";
import { BAD_REQUEST_RESPONSE } from "../utils/constants.js";
import { DefaultResponse, UserTokensResponse } from "../types/api/responses.js";

/**
 * Инициализировать роуты для Авторизации и регистрации пользователей
 * @param app Экземпляр Express приложения
 */
export const initUserRoutes = (app: core.Express) => {
  app.post('/register', async (req, res) => {
    const body = await req.body;
    let opResult = BAD_REQUEST_RESPONSE;

    if (body && 'login' in body && 'password' in body) {
      const user: NewUser = new User({
        login: body.login,
        password: body.password,
      });

      opResult = await user.register();
    }

    res
      .status(opResult.statusCode)
      .send(
        JSON.stringify({
          message: opResult.message,
      }));
  });
  
  app.post('/login', async (req, res) => {
    const { body } = req;
    let opResult: DefaultResponse | UserTokensResponse = BAD_REQUEST_RESPONSE;

    if (body && 'login' in body && 'password' in body) {
      const user: NewUser = new User({
        login: body.login,
        password: body.password,
      });

      opResult = await user.signIn();
    }

    res
      .status(opResult.statusCode)
      .send(
        JSON.stringify({
          message: opResult.message,
          payload: opResult.payload,
      }));
  });

  app.post('/refresh', async (req, res) => {
    const { body } = req;
    let opResult: DefaultResponse | UserTokensResponse = BAD_REQUEST_RESPONSE;

    if (body && body.refreshToken) {
      opResult = await User.refresh(body.refreshToken);
    }

    res
      .status(opResult.statusCode)
      .send(
        JSON.stringify({
          message: opResult.message,
          payload: opResult.payload,
      }));
  });
}