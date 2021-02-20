import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const register = (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name)
    return res.status(400).send({ message: "Bad request" });

  userModel.getIdByUsername(username, (error, results) => {
    if (error) return res.status(500).send(error);
    else if (results.length !== 0)
      return res.status(409).send({ message: "User already exist!" });

    return userModel.createUser(username, password, name, (error, _) => {
      if (error) return res.status(500).send(error);
      return res.status(201).send({ message: "User created" });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ message: "Bad request" });

  userModel.getIdByUsername(username, (error, results) => {
    if (error) return res.status(500).send(error);
    else if (results.length === 0)
      return res.status(401).send({ message: "User not found" });

    return userModel.getIdByUsernamePassword(
      username,
      password,
      (error, results) => {
        if (error) return res.status(500).send(error);
        else if (results.length === 0)
          return res.status(401).send({ message: "Wrong password" });
        return jwt.sign(
          {
            userId: results[0].id,
          },
          "secretkey",
          (error, encoded) => {
            if (error) return res.status(500).send(error);
            return res.status(201).send({
              message: "Login succesful",
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
