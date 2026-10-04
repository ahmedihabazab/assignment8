import express from "express";
import { PORT } from "./config/config.js";
import { authController } from "./modules/auth/auth.controller.js";
import { dbConnection } from "./DB/connection.db.js";
import mongoose from "mongoose";

async function bootstrap() {
  const server = express();

  server.use(express.json());
  await dbConnection();
  await mongoose.syncIndexes();

  server.use("/auth", authController);


  server.listen(PORT, () => {
    console.log(`on PORT ${PORT}`);
  });
}

bootstrap();
