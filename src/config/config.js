import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve("src\\.env.dev") });

export const PORT = Number(process.env.PORT) || 3000;
export const DBURI = process.env.DBURI;
export const ECRYPT_KEY = process.env.ECRYPT_KEY;
export const DECRYPT_KEY = process.env.DECRYPT_KEY;
export const SALT_ROUND = Number(process.env.SALT_ROUND);