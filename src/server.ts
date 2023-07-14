import "reflect-metadata";
import { app } from "./app";
import { datasource } from "./modules/shared/database/index";
// import "../src/modules/shared/container/index";
import "dotenv/config";

const Port = process.env.PORT;

datasource.initialize().then(() => {
  app.listen(`${Port}`, () => {
    return console.log(`Server started on port ${Port}! 🏆`);
  });
});

export default app;
