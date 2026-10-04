import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../common/response/success.response.js";

export const authController = Router();

authController.post("/signup", async (req, res) => {
  try {
    const result = await signup(req.body);
    successResponse({ res, statusCode: 201, msg: "created", data: result });
  } catch (error) {
    res.status(400).json(error.stack);
  }
});

authController.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);
    successResponse({ res, statusCode: 201, msg: "created", data: result });
  } catch (error) {
    res.status(400).json(error.stack);
  }
});