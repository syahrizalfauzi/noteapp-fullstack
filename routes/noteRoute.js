import express from "express";
import jwt from "jsonwebtoken";
import noteController from "../controllers/noteController.js";

const app = express.Router();
const secretKey = process.env.SECRET || "rahasia";

const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken)
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access" });
  const token = headerToken.split(" ")[1];
  console.log("token ", token);

  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) return res.status(500).send({ error, message: "Server error" });
    req.body.userId = decoded.userId;
    return next();
  });
};

app.get("/", verifyToken, noteController.getNote);
app.post("/", verifyToken, noteController.createNote);
app.delete("/", verifyToken, noteController.deleteNote);
app.put("/", verifyToken, noteController.updateNote);

export default app;
