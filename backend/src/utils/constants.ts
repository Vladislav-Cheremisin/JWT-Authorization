import { SERVER_MSGS } from "./langConstants.js";
import { dbOperationResult } from "./types.js";

type ServerConfig = {
  port: number,
  mongoUri: string,
}

const SERVER_CONFIG: ServerConfig = {
  port: 5000,
  mongoUri: "mongodb://admin:qwerty123@127.0.0.1:27017/auth"
}

const BAD_REQUEST_RESPONSE: dbOperationResult = {
  isSuccess: false,
  statusCode: 400,
  message: SERVER_MSGS.badRequest,
}

export {
  SERVER_CONFIG,
  BAD_REQUEST_RESPONSE,
};
