import * as core from "express-serve-static-core";

export const initUserController = (app: core.Express) => {
  app.get('/', (req, res) => {
    res
      .status(200)
      .send('Main route');
  });

  app.get('/admin', (req, res) => {
    res
      .status(200)
      .send('Admin route');
  });
}