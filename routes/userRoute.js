import express from "express";
import userController from "../controllers/userController.js";
import jwt from "jsonwebtoken";

const app = express.Router();
const secretKey = process.env.SECRET || "rahasia";

const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken)
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  const token = headerToken.split(" ")[1];

  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) return res.status(500).send({ error, message: "Server error" });
    req.body.userId = decoded.userId;
    return next();
  });
};

app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/info", verifyToken, userController.info);

export default app;
