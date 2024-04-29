import { SERVER_CONFIG } from "./utils/constants.js";
import { connectToDatabase, runServer } from "./utils/serverHelpers.js";
import { initUserController } from "./controllers/UserController.js";

const app = runServer(SERVER_CONFIG.port);
const dbConnection = connectToDatabase(SERVER_CONFIG.mongoUri);

initUserController(app);