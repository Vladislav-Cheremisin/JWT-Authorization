import * as core from "express-serve-static-core";
import { User } from "../models/UserModel.js";
import { newUser } from "../models/types.js";
import { BAD_REQUEST_RESPONSE } from "../utils/constants.js";

/**
 * Инициализировать роуты для Авторизации и регистрации пользователей
 * @param app Экземпляр Express приложения
 */
export const initUserController = (app: core.Express) => {
  app.post('/login', async (req, res) => {
    const { body } = req;
    let opResult = BAD_REQUEST_RESPONSE;

    if (body && 'login' in body && 'password' in body) {
      const user: newUser = new User({
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
      }));
  });

  app.post('/register', async (req, res) => {
    const body = await req.body;
    let opResult = BAD_REQUEST_RESPONSE;

    if (body && 'login' in body && 'password' in body) {
      const user: newUser = new User({
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
}