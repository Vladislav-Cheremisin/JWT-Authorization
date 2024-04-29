/**
 * TODO: Перенсти в dotenv.
 */
type ServerConfig = {
  port: number,
  mongoUri: string,
}

const SERVER_CONFIG: ServerConfig = {
  port: 5000,
  mongoUri: "mongodb://admin:qwerty123@127.0.0.1:27017/auth"
}

export {
  SERVER_CONFIG,
};
