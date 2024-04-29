import express from "express";
import mongoose from "mongoose";
import { SERVER_MSGS } from "./langConstants.js";

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
const runServer = (port: number) => {
  const app = express();

  app.listen(port, () => console.log(SERVER_MSGS.serverStartSuccess));

  return app;
}

export {
  connectToDatabase,
  runServer,
}