import express from "express";
import mongoose from "mongoose";
import * as core from "express-serve-static-core";
import { SERVER_MSGS } from "./langConstants.js";
import { isErrorObject } from "../types/guards.js";
import { DefaultResponse } from "../types/api/responses.js";

/**
 * Подключиться к базе данных MongoDB
 * @param uri uri базы данных MongoDB
 * @returns экземпляр mongoose.connection
 */
const connectToDatabase = (uri: string): mongoose.Connection => {
  mongoose.connect(uri);

  const dbConnection = mongoose.connection;

  dbConnection.on('error', console.error.bind(console, SERVER_MSGS.dbConnectError));
  dbConnection.once('open', () => console.log(SERVER_MSGS.dbConnectSuccess));

  return dbConnection;
}

/**
 * Запустить сервер Express
 * @param port порт на котором сервер будет запущен
 * @returns экземпляр сервера Express
 */
const runServer = (port: number): core.Express => {
  const app = express();

  app.use(express.json());
  app.listen(port, () => console.log(SERVER_MSGS.serverStartSuccess));

  return app;
}

/**
 * Обработать ошибку полученную при запросе (для catch блоков)
 * @param err ошибка сервера.
 * @returns возвращает структуру соответствующую типу результата операции.
 */
const handleRequestErr = (err: unknown): DefaultResponse => {
  return {
    isSuccess: false,
    statusCode: 500,
    payload: null,
    message: isErrorObject(err)
      ? err.message
      : SERVER_MSGS.requestError,
  }
}

export {
  handleRequestErr,
  connectToDatabase,
  runServer,
}