const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const secretKey = process.env.SECRET || "rahasia";

const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ message: "Bad request", error: true });

  userModel.getIdByUsername(username, (error, results) => {
    if (error) {
      console.log("getIdByUsername database error", error);
      return res.status(500).send(error);
    } else if (results.length > 0)
      return res
        .status(200)
        .send({ message: "User already exist!", error: true });

    return userModel.createUser(username, password, (error, _) => {
      if (error) {
        console.log("createUser database error", error);
        return res.status(500).send(error);
      }
      return res
        .status(201)
        .send({ message: "User created, please log in", error: false });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ message: "Bad request", error: true });

  userModel.getIdByUsername(username, (error, results) => {
    if (error) {
      console.log("getIdByUsername database error", error);
      return res.status(500).send(error);
    } else if (results.length === 0)
      return res.status(200).send({ message: "User not found", error: true });

    return userModel.getIdByUsernamePassword(
      username,
      password,
      (error, results) => {
        if (error) {
          console.log("getIdByUsernamePassword database error", error);
          return res.status(500).send(error);
        } else if (results.length === 0)
          return res
            .status(200)
            .send({ message: "Wrong password", error: true });
        return jwt.sign(
          {
            userId: results[0].id,
            username: results[0].username,
          },
          secretKey,
          (error, encoded) => {
            if (error) return res.status(500).send(error);
            return res.status(202).send({
              message: "Login success",
              error: false,
              token: encoded,
              username,
            });
          }
        );
      }
    );
  });
};

const resetPassword = (req, res) => {
  const { userId, newPassword } = req.body;
  if (!userId || !newPassword)
    return res.status(400).send({ message: "Bad request", error: true });

  userModel.changePassword(userId, newPassword, (error, _) => {
    if (error) {
      console.log("changePassword database error", error);
      return res.status(500).send(error);
    }
    return res
      .status(201)
      .send({ message: "Password changed, please log in", error: false });
  });
};

// const sendResetEmail = async (_, res) => {
//   const token = jwt.sign(
//     {
//       userId: "1",
//     },
//     "resetpasswordsecret",
//     { expiresIn: "5m" }
//   );

//   let transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "uasrpl33@gmail.com",
//       pass: "Password!33",
//     },
//   });

//   let mailOptions = {
//     from: '"UAS RPL" <uasrpl33@gmail.com>',
//     to: "syahrizalfauzi16@gmail.com",
//     subject: "Password reset",
//     text: token,
//     html: `<a href='http://localhost:3000/resetpassword/${token}'>Reset password, expires in 5 minutes</a>`,
//   };

//   await transporter.sendMail(mailOptions);
//   res.send("sent token");
// };

module.exports = {
  register,
  login,
  resetPassword,
  // sendResetEmail,
};
