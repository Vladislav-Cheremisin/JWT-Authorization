import { SERVER_CONFIG } from "./utils/constants.js";
import { connectToDatabase, runServer } from "./utils/serverHelpers.js";
import { initUserController } from "./controllers/UserController.js";

/**
 * TODOS:
 * 1) Перенести настройки сервера в dotenv файл.
 * 2) Написать тесты.
 * 3) Подцепить swagger.
 * 4) Подцепить lingui.
 */

const app = runServer(SERVER_CONFIG.port);
const dbConnection = connectToDatabase(SERVER_CONFIG.mongoUri);

initUserController(app);