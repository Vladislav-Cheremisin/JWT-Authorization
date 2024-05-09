import { SERVER_CONFIG } from "./utils/constants.js";
import { connectToDatabase, runServer } from "./utils/serverHelpers.js";
import { initUserRoutes } from "./routes/UserRoutes.js";

/**
 * TODOS:
 * 1) Перенести настройки сервера в dotenv файл.
 * 2) Написать тесты.
 * 3) Подцепить swagger.
 * 4) Подцепить lingui.
 * 5) Собирать бандл в 1 обфуцированный файл.
 * 6) Зарефакторить все методы почистив контроллер. **
 * 7) Накатить eslint и по человечески отформатировать код.
 */

const app = runServer(SERVER_CONFIG.port);
const dbConnection = connectToDatabase(SERVER_CONFIG.mongoUri);

initUserRoutes(app);