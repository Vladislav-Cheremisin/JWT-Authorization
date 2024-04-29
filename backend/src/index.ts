import mongoose from "mongoose";
import { SERVER_CONFIG } from "./utils/constants.js";
import { connectToDatabase, runServer } from "./utils/serverHelpers.js";
import { User } from "./models/UserModel.js";

const app = runServer(SERVER_CONFIG.port);
const dbConnection = connectToDatabase(SERVER_CONFIG.mongoUri);

app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});