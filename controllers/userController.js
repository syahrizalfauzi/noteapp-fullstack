import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET || "rahasia";

const register = (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name)
    return res.status(400).send({ message: "Bad request", error: true });

  userModel.getIdByUsername(username, (error, results) => {
    if (error) return res.status(500).send(error);
    else if (results.length > 0)
      return res
        .status(200)
        .send({ message: "User already exist!", error: true });

    return userModel.createUser(username, password, name, (error, _) => {
      if (error) return res.status(500).send(error);
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
    if (error) return res.status(500).send(error);
    else if (results.length === 0)
      return res.status(200).send({ message: "User not found", error: true });

    return userModel.getIdByUsernamePassword(
      username,
      password,
      (error, results) => {
        if (error) return res.status(500).send(error);
        else if (results.length === 0)
          return res
            .status(200)
            .send({ message: "Wrong password", error: true });
        return jwt.sign(
          {
            userId: results[0].id,
          },
          secretKey,
          (error, encoded) => {
            if (error) return res.status(500).send(error);
            return res.status(202).send({
              message: "Login success",
              error: false,
              token: encoded,
            });
          }
        );
      }
    );
  });
};

export default {
  register,
  login,
};
