import connection from "../db/db.js";

const getIdByUsername = (username, callback) => {
  connection.query(
    "SELECT id FROM users WHERE username = ? ",
    username,
    callback
  );
};
const getIdByUsernamePassword = (username, password, callback) => {
  connection.query(
    "SELECT id FROM users WHERE username = ? AND password = MD5(?)",
    [username, password],
    callback
  );
};
const createUser = (username, password, callback) => {
  connection.query(
    "INSERT INTO users (username, password) VALUES (?, MD5(?))",
    [username, password],
    callback
  );
};

export default {
  getIdByUsername,
  getIdByUsernamePassword,
  createUser,
};
