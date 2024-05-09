import { DefaultResponse } from "../types/api/responses.js";
import { SERVER_MSGS } from "./langConstants.js";

type ServerConfig = {
  port: number,
  mongoUri: string,
  accessTokenExpTime: string,
  refreshTokenExpTime: string,
  secretWord: string,
}

const SERVER_CONFIG: ServerConfig = {
  port: 5000,
  mongoUri: "mongodb://admin:qwerty123@127.0.0.1:27017/auth",
  accessTokenExpTime: '30m',
  refreshTokenExpTime: '72h',
  secretWord: 'top secret'
}

const BAD_REQUEST_RESPONSE: DefaultResponse = {
  isSuccess: false,
  statusCode: 400,
  message: SERVER_MSGS.badRequest,
  payload: null,
}

export {
  SERVER_CONFIG,
  BAD_REQUEST_RESPONSE,
};
