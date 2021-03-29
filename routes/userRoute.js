const express = require("express");
// const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController.js");

const app = express.Router();

// const verifyToken = (req, res, next) => {
//   const headerToken = req.headers.authorization;
//   if (!headerToken)
//     return res
//       .status(401)
//       .send({ error: true, message: "Unauthorized access, please re-login" });
//   const token = headerToken.split(" ")[1];

//   return jwt.verify(token, "resetpasswordsecret", (error, decoded) => {
//     if (error) return res.status(500).send({ error, message: "Server error" });
//     req.body.userId = decoded.userId;
//     return next();
//   });
// };

app.post("/register", userController.register);
app.post("/login", userController.login);
// app.post("/changepassword", verifyToken, userController.resetPassword);
// app.get("/resetemail", userController.sendResetEmail);

module.exports = app;
