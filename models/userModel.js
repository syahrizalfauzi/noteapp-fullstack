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
const createUser = (username, password, name, callback) => {
  connection.query(
    "INSERT INTO users (username, password, name) VALUES (?, MD5(?), ?)",
    [username, password, name],
    callback
  );
};

export default {
  getIdByUsername,
  getIdByUsernamePassword,
  createUser,
};
