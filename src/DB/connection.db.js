import mongoose from "mongoose";
import { DBURI } from "../config/config.js";

export async function dbConnection() {
  try {
    await mongoose.connect(DBURI);
    console.log("DB connected");
  } catch (error) {
    console.log("Connection Failed");
    console.log(error);
  }
}
