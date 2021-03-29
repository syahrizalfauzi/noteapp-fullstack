const connection = require("../db.js");

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
const changePassword = (userId, newPassword, callback) => {
  console.log(
    `Changing password for userId = ${userId}, password = ${newPassword}`
  );
  connection.query(
    "UPDATE users SET password = MD5(?) WHERE id = ?",
    [newPassword, userId],
    callback
  );
};

module.exports = {
  getIdByUsername,
  getIdByUsernamePassword,
  createUser,
  changePassword,
};
