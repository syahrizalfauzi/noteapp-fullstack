import express from "express";
import userController from "../controllers/userController.js";

const app = express.Router();

app.post("/register", userController.register);
app.post("/login", userController.login);

export default app;
